import {
  Button,
  Drawer,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputForUploadFile } from './InputForUploadFile';
import shadows from '@mui/material/styles/shadows';
import { ToggleMode } from './patterns/components/ToggleModeTheme';

interface Props {
  keys: string[] | null;
  onSubmitFn: SubmitHandler<any>;
  handleFile: (event: any) => void;
  handleResetFile: () => void;
}

const StackStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  margin: '1rem auto',
  gap: '1rem',
  padding: '2rem',
  borderRadius: '1rem',
  backgroundColor: 'background.default',
  color: 'text.primary',
  boxShadow: shadows[20],
};

const drawerWidth = 540;

export const SideBarFillTemplate: React.FC<Props> = ({
  keys,
  onSubmitFn,
  handleFile,
  handleResetFile,
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
          // top: '4%',
        },
        '& .css-15b8vjn-MuiPaper-root-MuiDrawer-paper': {
          // top: '4%',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {keys ? (
        <Paper sx={StackStyle}>
          <Typography
            color="text.primary"
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
                marginTop: '1rem',
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
                color="primary"
                type="submit"
                sx={{ marginTop: '1rem' }}
              >
                {' '}
                Substituir Palavras
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetFile}
                color="secondary"
                sx={{ marginTop: '1rem' }}
              >
                {' '}
                Resetar Documento
              </Button>
            </form>
          </Stack>
        </Paper>
      ) : (
        <Paper sx={StackStyle}>
          <Typography color="text.primary" component={'h4'} variant="h4">
            Gerador de documento
          </Typography>
          <Stack gap={'0.5rem'}>
            <Typography
              color="text.primary"
              component={'span'}
              variant="subtitle2"
            >
              Faça documentos rápidamente preenchendo apenas palavras ou frases
              que deseja substituir. Palavras ou frases a serem substituidas
              devem esta entre dois colchetes &#123;&#123; &#125;&#125;.
            </Typography>
            <Typography
              color="text.secondary"
              component={'span'}
              variant="subtitle2"
            >
              <strong>Exemplo : &#123;&#123;nome_completo&#125;&#125;</strong>
            </Typography>
          </Stack>
          <InputForUploadFile handleFile={handleFile} />
        </Paper>
      )}
      {/* <Stack alignItems={'center'} position={'fixed'} top={'95%'}>
        <ToggleMode />
      </Stack> */}
    </Drawer>
  );
};
