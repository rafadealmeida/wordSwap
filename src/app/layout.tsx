"use client"
// import './globals.css';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Word Swap',
  description: 'Faça documentos rápidamente',
};

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });
const ligthTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <Toaster position="top-center" />
        <ThemeProvider theme={ligthTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
