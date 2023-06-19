'use client';

import { app } from '@/service/firebase';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers'


const auth = getAuth(app);

export default function Home(props: any) {
  console.log('props', props);
  const router = useRouter();
  const login = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        'rafa@email.com',
        '123456',
      );

      console.log(response.user);
      const user = response.user;
      router.push('/dashboard');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  return (
    <Stack>
      <Typography component={'h5'} variant="h2">
        Seja bem-vindo ao WordSwap
      </Typography>
      <Button variant="contained" onClick={login}>
        Login
      </Button>
    </Stack>
  );
}

export async function getServerSideProps() {
  return { props: {
    params: {
      teste:'teste'
    }
  } };
}
