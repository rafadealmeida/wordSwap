'use client';

import { Button, IconButton, Stack, Typography } from '@mui/material';

interface Props {
  handleFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForUploadFile: React.FC<Props> = ({ handleFile }) => {
  return (
    <Stack direction={'column'} alignItems={'center'} gap={'0.5rem'}>
      <Button variant="contained" component="label"  color='primary'>
        Selecione um Documento
        <input
          hidden
          type="file"
          id="file"
          accept=".doc, .docx"
          onChange={handleFile}
        />
      </Button>
      <Typography color="text.secondary" component={'p'} variant="subtitle2">
        Tipo de documentos aceitos : dosc e docx
      </Typography>
    </Stack>
  );
};
