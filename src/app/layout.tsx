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
import { AuthContextProvider } from '@/service/firebase/AuthContext';
import { createCookies, getCookieTheme } from '@/util/createCookies';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Word Swap',
  description: 'Faça documentos rápidamente',
};

const getThemeCookies = async (): Promise<string> => {
  const theme = await getCookieTheme();
  console.log('cookies', theme?.value);
  return theme?.value as string;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<ThemeContextType | boolean>(false);

  const checkTheme = async () => {
    const theme = await getThemeCookies();
    console.log('theme', theme );
    console.log('theme verfica:', theme === 'true');
    if (theme !== null) {
      const result = theme === 'true' ? true : false;
      setDarkMode(result);
    }
    if (theme === null) createCookies();
  };

  useEffect(() => {
    checkTheme();
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
          <AuthContextProvider>
            <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
              <CssBaseline />
              <NavBar />
              {children}
            </ThemeProvider>
          </AuthContextProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
