import { FileObj } from '@/@types/typesFile';
import { Button, Pagination, Stack, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';

interface Props {
  keys: String[];
  file: String;
  conteudo: String;
  text: String;
  upload: () => void;
  handleCancelSendFile: () => void;
}

export const FileViewer: React.FC<Props> = ({
  keys,
  file,
  conteudo,
  text,
  upload,
  handleCancelSendFile,
}) => {
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matches = useMediaQuery(theme.breakpoints.down('xl'));
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4650;

  const pageCount = Math.ceil(text.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const renderedText = text.substring(startIndex, endIndex);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  return (
    <Stack
      sx={{
        width: matches ? '100%' : '50%',
        backgroundColor: '#fff',
        minHeight: text ? '90vh' : 'auto',
        padding: '16px 36px',
        // borderRadius: '10px',
        justifyContent: 'start',
        alignItems: 'center',
        overflowY: 'scroll',
        margin: '0 auto',
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
          Selecione um documento para continuar
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
          {renderedText}
          {/* {text} */}
        </Typography>
      ) : (
        <></>
      )}

      {pageCount > 1 && (
        <Stack direction="row" justifyContent="center" marginTop={2}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
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
