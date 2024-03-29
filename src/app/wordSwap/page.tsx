'use client';

// import { Document, Page, pdfjs } from 'react-pdf';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../service/axiosApi';
import { SubmitHandler } from 'react-hook-form';
import { Document, Packer, Paragraph } from 'docx';
import { ResponseText, FileObj } from '../../@types/typesFile';
import { SideBarFillTemplate } from '@/components/SideBarFillTemplate';
import { FileViewer } from '@/components/FileViewer';
import { ToolBarFile } from '@/components/ToolbarFile';
// import { NAV_BAR_HEIGHT } from '@/components/patterns/components/NavBar';
import { useAuthContext } from '@/service/firebase/AuthContext';
import { createPdf } from '@/util/createPdf';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { app } from '@/service/firebase';
import { ThemeAndCssProvider } from '@/components/patterns/components/ThemeAndCssProvider';
import { checkUserIsAccess } from '@/util/checkUserIsAccess';
import { checkUserIsDemo } from '@/util/checkUserIsDemo';
import { checkUserIsDemoCopyDoc } from '@/util/checkUserIsDemoCopyDoc';

const regex = /{{([^{}]+)}}/g;
const NAV_BAR_HEIGHT = 50;

export default function BasicCard() {
  const [file, setFile] = useState<string>('');
  const [, updateState] = useState<any>();
  const [conteudo, setConteudo] = useState<string>('');
  const [keys, setKeys] = useState<string[] | null>(null);
  const fileName = useRef('');
  const textRef = useRef('');
  const router = useRouter();
  // @ts-ignore
  const { user } = useAuthContext();
  const authUser = getAuth(app);


  useEffect(() => {
    setTimeout(() => {
      if (authUser?.currentUser === null) router.push('/');
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);
  // useEffect(() => {
  //   if (user === null) router.push('/');

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  const forceUpdate = useCallback(() => updateState({}), []);

  const onSubmitFn: SubmitHandler<any> = (data) => {
    const newText = conteudo.replace(regex, (match, key) => {
      if ((keys as String[]).includes(key) && data.hasOwnProperty(key)) {
        return data[key];
      } else {
        return match;
      }
    });
    textRef.current = newText;
    forceUpdate();
    // setConteudo(newText);
  };

  const handleFile = async (event: any): Promise<void> => {
    // setConteudo('');
    // textRef.current = '';
    // setKeys(null);
    const file = event.target?.files[0];
    const checkUser = await checkUserIsAccess(user.uid);
    if (
      (file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword') &&
      checkUser
    ) {
      setConteudo('');
      // checkUserIsAccess()

      textRef.current = '';
      setKeys(null);
      setFile(file);
    } else if (!checkUser) {
      toast.error(
        'Usuários sem permissão. Atualize conta ou plano para prosseguir.',
      );
    } else {
      toast.error('Arquivo não suportado');
    }
  };
  const handleResetFile = (): void => {
    const originalText = conteudo;
    textRef.current = originalText;
    forceUpdate();
  };

  const upload = async (): Promise<void> => {
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response: ResponseText = await api.post(
        '/api/fileUpload',
        formData,
      );
      if (response.data.status !== 201) {
        toast.error(`${response.data.mensagem}`);
      }
      if (response.data.status === 201) {
        fileName.current = (file as unknown as FileObj).name;
        setKeys(response.data.keys);
        setConteudo(response.data.conteudo);
        textRef.current = response.data.conteudo;
        toast.success(`${response.data.mensagem}`);
      }
    } catch (error: any) {
      toast.error(`Aconteceu um erro inesperado.`);
    } finally {
      setFile('');
    }
  };

  const generateDoc = async (): Promise<void> => {
    const checkUserisDemo = await checkUserIsDemo(user.uid);
    if (!checkUserisDemo) {
      toast('Você excedeu o limite de uso deste recurso em contas demo');
    } else {
      const textParagraph = textRef.current.split('\n');
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: textParagraph.map(
              (paragraph) =>
                new Paragraph({
                  text: paragraph,
                }),
            ),
          },
        ],
      });

      const docBlob = await Packer.toBlob(doc);
      const urlLink = window.URL.createObjectURL(docBlob);
      const link = document.createElement('a');
      link.href = urlLink;
      link.setAttribute('download', fileName.current);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const generatePDF = async () => {
    await createPdf({ text: textRef.current }, { filename: fileName.current });
  };

  const handleCopy = async () => {
    const checkUserisDemoForCopyText = await checkUserIsDemoCopyDoc(user.uid);
    if(checkUserisDemoForCopyText){
      navigator.clipboard.writeText(textRef.current).then(() => {
        toast.success('Texto Copiado com sucesso');
      });
    } else{
      toast('Você excedeu o limite de uso deste recurso em contas demo');
    }
  };
  const handleCancelSendFile = () => {
    setFile('');
  };

  const drawerWidth = 540;

  return (
    <ThemeAndCssProvider>
      <Box
        sx={{
          display: 'flex',
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))',
          height: '96.8vh',
          overflowY: 'hidden',
          top: NAV_BAR_HEIGHT,
          // top:'4vh',
          ' & .css-1fw3wc0-MuiDrawer-docked .css-15b8vjn-MuiPaper-root-MuiDrawer-paper':
            {
              top: NAV_BAR_HEIGHT,
            },
          '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
            top: NAV_BAR_HEIGHT,
          },
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            top: NAV_BAR_HEIGHT,
            // top: '4%',
          }}
        >
          <Toolbar
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {fileName.current ? (
              <Stack
                direction={'row'}
                alignItems={'center'}
                width="100%"
                justifyContent={'space-between'}
              >
                <Typography variant="h6" noWrap component="div">
                  <strong>{fileName.current}</strong>
                </Typography>
                <ToolBarFile
                  handleCopy={handleCopy}
                  handleFile={handleFile}
                  generateDoc={generateDoc}
                  generatePDF={generatePDF}
                />
              </Stack>
            ) : (
              <Typography color="white" component={'span'} variant="h6">
                Nenhum documento selecionado
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <SideBarFillTemplate
          keys={keys}
          onSubmitFn={onSubmitFn}
          handleFile={handleFile}
          handleResetFile={handleResetFile}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <FileViewer
            keys={keys as String[]}
            file={file}
            upload={upload}
            text={textRef.current}
            conteudo={conteudo}
            handleCancelSendFile={handleCancelSendFile}
          />
        </Box>
      </Box>
    </ThemeAndCssProvider>
  );
}
