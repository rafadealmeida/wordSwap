'use client';

// import { Document, Page, pdfjs } from 'react-pdf';
import { Stack, Typography } from '@mui/material';
import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import api from '../../service/axiosApi';
import { SubmitHandler } from 'react-hook-form';

import { ResponseText, FileObj } from '../../@types/typesFile';
import { SideBarFillTemplate } from '@/components/SideBarFillTemplate';
import { FileViewer } from '@/components/FileViewer';
import { ToolBarFile } from '@/components/ToolbarFile';
import { InputForUploadFile } from '@/components/InputForUploadFile';

// pdfjs.GlobalWorkerOptions.workerSrc = WORKERSRC;
const regex = /{{([^{}]+)}}/g;

export default function BasicCard() {
  const [file, setFile] = useState<string>('');
  const [, updateState] = useState<any>();
  const [conteudo, setConteudo] = useState<string>('');
  const [keys, setKeys] = useState<string[] | null>();
  const fileName = useRef('');
  const textRef = useRef('');

  const forceUpdate = useCallback(() => updateState({}), []);

  const onSubmitFn: SubmitHandler<any> = (data) => {
    console.log('submit', data);
    const newText = conteudo.replace(regex, (match, key) => {
      if ((keys as String[]).includes(key) && data.hasOwnProperty(key)) {
        return data[key];
      } else {
        return match;
      }
    });
    console.log('new text', newText);
    textRef.current = newText;
    forceUpdate();
    // setConteudo(newText);
  };

  const handleFile = (event: any): void => {
    // setConteudo('');
    // textRef.current = '';
    // setKeys(null);
    const file = event.target?.files[0];
    if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
      setConteudo('');
      textRef.current = '';
      setKeys(null);
      setFile(file);
    } else {
      toast.error('Arquivo não suportado');
    }
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

  const handleCopy = () => {
    navigator.clipboard.writeText(textRef.current).then(() => {
      toast.success('Texto Copiado com sucesso');
    });
  };
  const handleCancelSendFile = () => {
    setFile('');
  };

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ height: '100vh', overflowY: 'scroll' }}
      spacing={2}
    >
      {!keys ? (
        <InputForUploadFile handleFile={handleFile} />
      ) : (
        <Typography color="black" component={'span'} variant="h5">
          Editando o documento : <strong>{fileName.current}</strong>
        </Typography>
      )}
      {keys ? (
        <ToolBarFile handleCopy={handleCopy} handleFile={handleFile} />
      ) : (
        <></>
      )}
      <FileViewer
        keys={keys as String[]}
        file={file}
        upload={upload}
        text={textRef.current}
        conteudo={conteudo}
        handleCancelSendFile={handleCancelSendFile}
      />

      <Typography color="#555555" component={'p'} variant="subtitle2">
        Tipo de documentos aceitos : dosc e docx
      </Typography>

      {keys ? (
        <SideBarFillTemplate keys={keys} onSubmitFn={onSubmitFn} />
      ) : (
        <></>
      )}
    </Stack>
  );
}
