'use client';

// import { Document, Page, pdfjs } from 'react-pdf';
import {
  IconButton,
  Stack,
  Button,
  Typography,
  TextField,
  Tooltip,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState, useRef } from 'react';
import { WORKERSRC } from '../../../pdf-worker';
import { toast } from 'react-hot-toast';
import api from '../../service/axiosApi';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { ResponseText, FileObj } from '../../@types/typesFile';

// pdfjs.GlobalWorkerOptions.workerSrc = WORKERSRC;
const regex = /{{([^{}]+)}}/g;

export default function BasicCard() {
  const [file, setFile] = useState<string>('');
  const [conteudo, setConteudo] = useState<string>('');
  const [keys, setKeys] = useState<string[]>();
  const fileName = useRef('');
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    const newText = conteudo.replace(regex, (match, key) => {
      if ((keys as String[]).includes(key) && data.hasOwnProperty(key)) {
        return data[key];
      } else {
        return match;
      }
    });
    setConteudo(newText);
  };

  const handleFile = (event: any): void => {
    setConteudo('');
    const file = event.target?.files[0];
    if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword'
    ) {
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
        toast.success(`${response.data.mensagem}`);
      }
    } catch (error: any) {
      toast.error(`Aconteceu um erro inesperado.`);
    } finally {
      setFile('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(conteudo).then(() => {
      toast.success('Texto Copiado com sucesso');
    });
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
        <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
          <Typography component="label" id="file" color={'black'} variant="h5">
            Selecione um Documento:
          </Typography>
          <IconButton color="info" component="label" sx={{ width: '5%' }}>
            <AttachFileIcon fontSize="medium" />
            <input
              hidden
              type="file"
              id="file"
              accept=".doc, .docx"
              onChange={handleFile}
            />
          </IconButton>
        </Stack>
      ) : (
        <Typography color="black" component={'span'} variant="h5">
          Editando o documento : <strong>{fileName.current}</strong>
        </Typography>
      )}
      {keys ? (
        <Stack
          direction="row"
          spacing={1}
          justifyContent={'end'}
          width={'50vw'}
        >
          <Tooltip title="Trocar arquivo">
            <IconButton component="label">
              <AttachFileIcon fontSize="medium" />
              <input
                hidden
                type="file"
                id="file"
                accept=".doc, .docx"
                onChange={handleFile}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copiar texto">
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <></>
      )}
      <Stack
        sx={{
          width: keys ? '50vw' : '40%',
          backgroundColor: '#fff',
          height: keys ? '40%' : '10vh',
          padding: '24px 0',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'scroll',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
          gap: '1rem',
        }}
      >
        {file && (
          <Typography color="black" component={'span'}>
            Documento selecionado : {(file as unknown as FileObj).name}
          </Typography>
        )}
        {!file && !conteudo && (
          <Typography color="black" component={'span'}>
            Nenhum documento selecionado
          </Typography>
        )}
        {keys ? (
          <Typography
            color="black"
            component={'p'}
            width={'95%'}
            // align="justify"
            marginTop={'1rem'}
            lineHeight={'1.5rem'}
          >
            {conteudo}
          </Typography>
        ) : (
          <></>
        )}
        {file ? (
          <Button
            variant="contained"
            onClick={upload}
            sx={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.5)' }}
          >
            Confirmar
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      <Typography color="#555555" component={'p'} variant="subtitle2">
        Tipo de documentos aceitos : dosc e docx
      </Typography>

      {keys ? (
        <Stack
          sx={{
            backgroundColor: '#fff',
            padding: '16px',
            width: '50vw',
            borderRadius: '10px',
            overflowY: 'scroll',
            height: '40%',
          }}
          spacing={3}
          direction={'column'}
        >
          <Typography
            color="#000"
            component={'h2'}
            variant="h5"
            sx={{ textAlign: 'center' }}
          >
            Escreva nos campos as informações que deseja substituir.
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {keys ? (
              [...new Set(keys)].map((key) => (
                <Controller
                  name={`${key}`}
                  control={control}
                  key={key}
                  render={({ field }) => (
                    <TextField
                      label={key}
                      variant="outlined"
                      required
                      {...field}
                    />
                  )}
                />
              ))
            ) : (
              <></>
            )}
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: '1rem' }}
            >
              {' '}
              Substituir Palavras
            </Button>
          </form>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
}
