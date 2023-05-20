'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Document, Page, pdfjs } from 'react-pdf';
import { IconButton, Stack } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const [file, setFile] = useState<string>('');

  const handleFile = (event: any): void => {
    const file = event.target?.files[0];
    // const fileURL = URL.createObjectURL(file);
    // console.log(typeof fileURL);
    setFile(file);
  };

  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Typography>Escolha um arquivo</Typography>
      <IconButton color="info" component="label" sx={{ width: '5%' }}>
        <AttachFileIcon />
        <input hidden type="file" id="file" onChange={handleFile} />
      </IconButton>
      <Box sx={{ width: '40%', backgroundColor: '#fff', height: '25vh' }}>
        {file ? (
          // eslint-disable-next-line @next/next/no-img-element
          // <img src={file} alt="file" width={'100%'} height={'100%'} />
          <Document file={file}>
            <Page
              pageNumber={1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        ) : (
          <Typography color="black" component={'span'}>
            Selecione uma imagem
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
