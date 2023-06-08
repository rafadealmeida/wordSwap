import { Button, Drawer, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputForUploadFile } from './InputForUploadFile';

interface Props {
  keys: string[] | null;
  onSubmitFn: SubmitHandler<any>;
  handleFile: (event: any) => void;
}

const StackStyle = {
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  margin: '4rem auto',
  gap: '1rem',
  padding: '2rem',
  borderRadius: '1rem',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
};

const drawerWidth = 540;

export const SideBarFillTemplate: React.FC<Props> = ({
  keys,
  onSubmitFn,
  handleFile,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
          backgroundColor: '#f1eeee',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {keys ? (
        <Stack sx={StackStyle}>
          <Typography
            color="#000"
            component={'h2'}
            variant="h5"
            sx={{ textAlign: 'center' }}
          >
            Escreva nos campos as informações que deseja substituir.
          </Typography>
          <Stack
            sx={{
              width: '95%',
              overflowY: 'scroll',
            }}
            spacing={3}
            direction={'column'}
          >
            <form
              onSubmit={handleSubmit(onSubmitFn)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                maxHeight: '60%',
                minHeight: '30%',
              }}
            >
              {keys.length > 0 ? (
                [...new Set(keys)].map((key) => (
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
                ))
              ) : (
                <></>
              )}
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
        </Stack>
      ) : (
        <Stack sx={StackStyle}>
          <Typography color="#1b1a1a" component={'h4'} variant="h4">
            Gerador de documento
          </Typography>
          <Stack gap={'0.5rem'}>
            <Typography color="#595959" component={'span'} variant="subtitle2">
              Você pode fazer documentos rápidamente preenchendo apenas palavras
              ou frases. Palavras ou frases a serem substituidas devem esta
              entre dois colchetes &#123;&#123; &#125;&#125;.
            </Typography>
            <Typography color="#595959" component={'span'} variant="subtitle2">
              <strong>Exemplo : &#123;&#123;nome_completo&#125;&#125;</strong>
            </Typography>
          </Stack>
          <InputForUploadFile handleFile={handleFile} />
        </Stack>
      )}
    </Drawer>
  );
};
