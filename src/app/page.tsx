'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { Button, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Stack className={styles.main}>
      <Typography component={'h5'} variant="h2">
        Seja bem vindo
      </Typography>

      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={4}
        marginTop={4}
      >
        <Typography component={'p'} variant="h5">
          O que deseja fazer?
        </Typography>

        <Stack direction={'row'} spacing={2}>
          <Link href={'/wordSwap'}>
            <Button variant="contained" size="large">Fazer documento</Button>
          </Link>
          <Link href={'#'}>
            <Button variant="outlined" size="large">Retirar texto de imagem</Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
