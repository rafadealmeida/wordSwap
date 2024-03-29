'use client';

import { FileObj } from '@/@types/typesFile';
import {
  Button,
  // Pagination,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { useState, useEffect } from 'react';

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
  // const [currentPage, setCurrentPage] = useState(1);

  // const totalChars = text.length;
  // const targetCharsPerPage = 4500;
  // const idealPageCount = Math.ceil(totalChars / targetCharsPerPage);
  // const perPage = Math.ceil(totalChars / idealPageCount);

  // const divideText = (startIndex:number) => {
  //   const endIndex = text.indexOf('\n', startIndex + perPage);
  //   if (endIndex !== -1) {
  //     return text.substring(startIndex, endIndex);
  //   }
  //   return text.substring(startIndex);
  // };

  // const pageCount = Math.ceil(totalChars / perPage);
  // const startIndex = (currentPage - 1) * perPage;
  // const renderedText = divideText(startIndex);

  // const handleChangePage = (
  //   event: React.ChangeEvent<unknown>,
  //   page: number,
  // ) => {
  //   setCurrentPage(page);
  // };


  return (
    <Paper
      sx={{
        width: matches ? '100%' : '70%',
        backgroundColor: 'background',
        maxHeight: text ? '85vh' : 'auto',
        // minHeight: text ? '90vh' : 'auto',
        padding: '16px 36px',
        color: 'text',
        // borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        // overflowY: 'scroll',
        margin: '0 auto',
        // boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
        boxShadow: shadows[20],
        gap: '1rem',
      }}
    >
      {file && (
        <Typography
          component={'span'}
          sx={{
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Documento selecionado : {(file as unknown as FileObj).name}
        </Typography>
      )}
      {!file && !conteudo && (
        <Typography
          component={'span'}
          sx={{
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Selecione um documento para continuar
        </Typography>
      )}
      {keys ? (
        <Typography
          component={'pre'}
          width={'95%'}
          // align="justify"
          marginTop={'1rem'}
          marginBottom={'2rem'}
          lineHeight={'1.5rem'}
          paddingRight={'16px'}
          sx={{
            whiteSpace: 'pre-wrap',
            overflowY: 'scroll',
          }}
        >
          {/* {renderedText} */}
          {text}
        </Typography>
      ) : (
        <></>
      )}

      {/* {pageCount > 1 && (
        <Stack direction="row" justifyContent="center" marginTop={2}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangePage}
            color="secondary"
          />
        </Stack>
      )} */}
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
    </Paper>
  );
};
