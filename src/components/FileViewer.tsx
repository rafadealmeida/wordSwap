import { FileObj } from '@/@types/typesFile';
import { Button, Stack, Typography } from '@mui/material';

interface Props {
  keys: String[];
  file: String;
  conteudo: String;
  text: String;
  upload: () => void;
  handleCancelSendFile:() => void;
}

export const FileViewer: React.FC<Props> = ({
  keys,
  file,
  conteudo,
  text,
  upload,
  handleCancelSendFile
}) => {
  return (
    <Stack
      sx={{
        width: keys ? '50vw' : '40%',
        backgroundColor: '#fff',
        maxHeight: keys ? '50%' : '10vh',
        padding: '16px 0',
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
          component={'pre'}
          width={'95%'}
          // align="justify"
          marginTop={'1rem'}
          lineHeight={'1.5rem'}
          sx={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {/* {conteudo} */}
          {text}
        </Typography>
      ) : (
        <></>
      )}
      {file ? (
        <Stack direction={'row'} gap={'1rem'}>
          <Button
            variant="contained"
            onClick={upload}
            sx={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.5)' }}
          >
            Confirmar
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelSendFile}
            sx={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.5)' }}
          >
            Cancelar
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};
