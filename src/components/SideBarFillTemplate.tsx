import { Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  keys: string[];
  onSubmitFn: SubmitHandler<any>;
}

export const SideBarFillTemplate: React.FC<Props> = ({ keys, onSubmitFn }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Stack direction={'column'} gap={'1rem'}>
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
          backgroundColor: '#fff',
          padding: '16px',
          width: '50vw',
          borderRadius: '10px',
          overflowY: 'scroll',
          // maxHeight: '60%',
          // minHeight: '30%',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
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
          <Button variant="contained" type="submit"  sx={{ marginTop: '1rem' }}>
            {' '}
            Substituir Palavras
          </Button>
        </form>
      </Stack>
    </Stack>
  );
};



