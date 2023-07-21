'use client';

import { app } from '@/service/firebase';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UpdateName } from '@/components/Modal/UpdateName';
import { CSSProperties, useState } from 'react';
import shadows from '@mui/material/styles/shadows';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { ThemeAndCssProvider } from '@/components/patterns/components/ThemeAndCssProvider';
import Lottie from 'lottie-react';
import LoadingGif from '../../public/imagens/LoadingGif.json';

const auth = getAuth(app);

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Deve se informar um email válido')
    .required('O campo de email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve conter no mínino 6 caracteres')
    .max(15, 'A senha deve conter no máximo 6 caracteres')
    .required('O campo de senha é obrigatório'),
});

const StyleFormFlex: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export default function Home() {
  const [openNameModal, setOpenNameModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => login(data.email, data.password);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      const response = await signInWithEmailAndPassword(auth, email, senha);

      const user = response.user;

      if (user.displayName === null) {
        setOpenNameModal(true);
        setLoading(false);
      } else {
        // router.push('/dashboard');
        router.push('/wordSwap');

        // setLoading(false);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
      console.log(errorCode, errorMessage);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <ThemeAndCssProvider>
      <Stack justifyContent={'center'} alignItems={'center'} height={'97vh'}>
        <Paper
          sx={{
            width: 500,
            padding: 8,
            borderRadius: '1rem',
            boxShadow: shadows[20],
            // margin: '1rem auto',
          }}
        >
          {loading ? (
            <Lottie animationData={LoadingGif} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={StyleFormFlex}>
              <Stack gap={'0.2rem'} marginBottom={2}>
                <Typography component={'h5'} variant="h3">
                  SimplificaDoc
                </Typography>
                <Typography component={'span'} variant="subtitle1">
                  Faça documentos rápidamente
                </Typography>
              </Stack>
              <Controller
                control={control}
                key="email_login"
                {...register('email')}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
              <Typography variant="subtitle2" color="error">
                {errors.email?.message}
              </Typography>
              <Controller
                {...register('password')}
                control={control}
                key="senha_login"
                render={({ field }) => (
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Senha
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Senha"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <Typography variant="subtitle2" color="error">
                {errors.password?.message}
              </Typography>

              <UpdateName open={openNameModal} setOpen={setOpenNameModal} />
              <Button variant="contained" type="submit">
                Login
              </Button>
            </form>
          )}
          {/* <form onSubmit={handleSubmit(onSubmit)} style={StyleFormFlex}>
            <Stack gap={'0.2rem'} marginBottom={2}>
              <Typography component={'h5'} variant="h3">
                SimplificaDoc
              </Typography>
              <Typography component={'span'} variant="subtitle1">
                Faça documentos rápidamente
              </Typography>
            </Stack>
            <Controller
              control={control}
              key="email_login"
              {...register('email')}
              render={({ field }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <Typography variant="subtitle2" color="error">
              {errors.email?.message}
            </Typography>
            <Controller
              {...register('password')}
              control={control}
              key="senha_login"
              render={({ field }) => (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                    {...field}
                  />
                </FormControl>
              )}
            />
            <Typography variant="subtitle2" color="error">
              {errors.password?.message}
            </Typography>

            <UpdateName open={openNameModal} setOpen={setOpenNameModal} />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form> */}
        </Paper>
      </Stack>
    </ThemeAndCssProvider>
  );
}
