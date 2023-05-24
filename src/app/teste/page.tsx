'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import {
  IconButton,
  Stack,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import { WORKERSRC } from '../../../pdf-worker';
import api from '../../../src/service/axiosApi';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { ResponseText, FileObj } from '../../@types/typesFile';

pdfjs.GlobalWorkerOptions.workerSrc = WORKERSRC;
const regex = /{{([^{}]+)}}/g;

export default function BasicCard() {
  const [file, setFile] = useState<string>('');
  const [conteudo, setConteudo] = useState<string>('');
  const [keys, setKeys] = useState<string[]>();
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
    const file = event.target?.files[0];
    setFile(file);
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
      setKeys(response.data.keys);
      setConteudo(response.data.conteudo);
      console.log(response.data.mensagem);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ height: '100vh' }}
      spacing={2}
    >
      <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
        <Typography component="label" id="file">
          Escolha um arquivo:
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

      <Stack
        sx={{
          width: '40%',
          backgroundColor: '#dad2d2',
          height: keys ? 'auto' : '10vh',
          padding: '24px',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {file ? (
          <Typography color="black" component={'span'}>
            Documento selecionado : {(file as unknown as FileObj).name}
          </Typography>
        ) : (
          <Typography color="black" component={'span'}>
            Selecione um Documento
          </Typography>
        )}
        {keys ? (
          <Typography color="black" component={'pre'}>
            {conteudo}
          </Typography>
        ) : (
          <></>
        )}
      </Stack>

      <Button variant="contained" onClick={upload}>
        Confirmar
      </Button>
      {keys ? (
        <Stack
          sx={{
            backgroundColor: '#fff',
            padding: '16px',
            width: '50vw',
            borderRadius: '10px',
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
            Escreva nos campos as infoirmações que deseja substituir.
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {keys?.map((key) => (
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
            ))}
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
