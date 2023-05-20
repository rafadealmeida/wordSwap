'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, Stack } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const [image, setImage] = useState<string>();

  const handleFile = (event: any): void => {
    const file = event.target?.files[0];
    const fileURL = URL.createObjectURL(file);
    console.log(typeof fileURL);
    setImage(fileURL);
  };

  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Typography>Escolha um arquivo</Typography>
      <IconButton color="info" component="label" sx={{ width: '5%' }}>
        <AttachFileIcon />
        <input hidden type="file" id="file" onChange={handleFile} />
      </IconButton>
      <Box sx={{ width: '40%', backgroundColor: '#fff', height: '25vh' }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="image"
            width={'100%'}
            height={'100%'}
          />
        ) : (
          <Typography color="black" component={'span'}>
            Selecione uma imagem
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
