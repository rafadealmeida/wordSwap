'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { IconButton, Stack, Button, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';
import { WORKERSRC } from '../../../pdf-worker';
import api from '../../../src/service/axiosApi';

pdfjs.GlobalWorkerOptions.workerSrc = WORKERSRC;

export default function BasicCard() {
  const [file, setFile] = useState<string>('');

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
      await api.post('/api/fileUpload', formData);
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
            accept=".doc, .docx, .pdf"
            onChange={handleFile}
          />
        </IconButton>
      </Stack>
      <Stack
        sx={{
          width: '40%',
          backgroundColor: '#fff',
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
    </Stack>
  );
}
