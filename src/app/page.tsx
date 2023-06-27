'use client';

import { app } from '@/service/firebase';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
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
    try {
      await setPersistence(auth, browserSessionPersistence);
      const response = await signInWithEmailAndPassword(auth, email, senha);

      const user = response.user;

      if (response.user.displayName === null) {
        setOpenNameModal(true);
      } else {
        // router.push('/dashboard');
        router.push('/wordSwap');
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  return (
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
              <TextField
                label="Senha"
                variant="outlined"
                fullWidth
                {...field}
              />
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
      </Paper>
    </Stack>
  );
}
