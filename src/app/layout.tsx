// import './globals.css';
import './scrollbar.css';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import NavBar from '@/components/patterns/components/NavBar';
import { AuthContextProvider } from '@/service/firebase/AuthContext';
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simplifica Doc',
  description: 'Faça documentos rápido',
};

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
        <AuthContextProvider>
          <>
            <NavBar />
            {children}
          </>
        </AuthContextProvider>
      </body>
    </html>
  );
}
