'use client';
// import './globals.css';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, ligthTheme } from '@/theme';
import NavBar from '@/components/patterns/components/NavBar';
import { createContext, useState } from 'react';
import { ThemeContextType } from '@/@types/typesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Word Swap',
  description: 'Faça documentos rápidamente',
};

// @ts-ignore
export const ThemeContext = createContext<ThemeContextType>(true);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<ThemeContextType | boolean>(true);

  return (
    <html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <Toaster position="top-center" />
        {/*  @ts-ignore */}
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
            <CssBaseline />
            {/* <NavBar /> */}
            {children}
          </ThemeProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
