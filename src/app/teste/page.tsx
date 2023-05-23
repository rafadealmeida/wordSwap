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

pdfjs.GlobalWorkerOptions.workerSrc = WORKERSRC;
const regex = /{{([^{}]+)}}/g

export default function BasicCard() {
  const [file, setFile] = useState<string>('');
  const [conteudo, setConteudo] = useState<string>('');
  const [keys, setKeys] = useState<string[]>();
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => {

    const newText = conteudo.replace(regex, (match, key) =>{
      if ((keys as String[]).includes(key) && data.hasOwnProperty(key)) {
        return data[key];
      } else {
        return match;
      }
    })
    setConteudo(newText)
  };


  const handleFile = (event: any): void => {
    const file = event.target?.files[0];
    setSelectedDocs(Array.from(event.target.files));
    console.log(URL.createObjectURL(file));

    setFile(file);
  };

  interface ResponseText {
    data: {
      keys: string[];
      conteudo: string;
      mensagem?: string;
      path?: string;
    };
  }

  const upload = async (): Promise<void> => {
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      // const response = await api.post('/api/fileUpload', formData);
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
          height: !file ? '10vh' : 'auto',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {file ? (
          <Document file={file}>
            <Page
              pageNumber={1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        ) : (
          <Typography color="black" component={'span'}>
            Selecione um Documento
          </Typography>
        )}
      </Stack>
      <Button variant="contained" onClick={upload}>
        Confirmar
      </Button>
      {keys ? (
        <Stack
          sx={{ backgroundColor: '#fff', padding: '16px' }}
          spacing={3}
          direction={'column'}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
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
                    margin="dense"
                    required
                    {...field}
                  />
                )}
              />
            ))}
            <Button variant="outlined" type="submit" sx={{ marginTop: '1rem' }}>
              {' '}
              Enviar
            </Button>
          </form>
        </Stack>
      ) : (
        <></>
      )}

      <Typography color="#fff" component={'pre'} sx={{ width: '50%' }}>
        {conteudo}
      </Typography>
    </Stack>
  );
}
