import { IconButton, Stack, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
interface Props {
  handleFile:(event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForUploadFile:React.FC<Props> = ({handleFile}) => {
  return (
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
  );
};
