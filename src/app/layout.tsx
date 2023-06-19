'use client';
// import './globals.css';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, ligthTheme } from '@/theme';
import NavBar from '@/components/patterns/components/NavBar';
import { createContext, useState, useEffect } from 'react';
import { ThemeContextType } from '@/@types/typesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Word Swap',
  description: 'Faça documentos rápidamente',
};

const theme = localStorage.getItem('USER_THEME_DARK');

// @ts-ignore
export const ThemeContext = createContext<ThemeContextType>(theme === 'true' ? true : false);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<ThemeContextType | boolean>(
    theme === 'true' ? true : false
  );

  useEffect(() => {
    if (theme !== null) {
      setDarkMode(theme === 'true' ? true : false);
    }
    if (theme === null) localStorage.setItem('USER_THEME_DARK', 'false');
  }, []);

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
            <NavBar />
            {children}
          </ThemeProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
