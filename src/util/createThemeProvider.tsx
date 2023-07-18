'use client';

import { ThemeContextType } from '@/@types/typesContext';
import { createContext, useEffect, useState } from 'react';
import { createCookies, getCookieTheme } from './createCookies';

export const ThemeCreateContext = createContext<ThemeContextType | null>(null);

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState<ThemeContextType | boolean>(true);
  const getThemeCookies = async (): Promise<string> => {
    const theme = await getCookieTheme();
    // console.log('cookies', theme?.value);
    return theme?.value as string;
  };
  const checkTheme = async () => {
    const theme = await getThemeCookies();
    // console.log('theme', theme );
    // console.log('theme verfica:', theme === 'true');
    if (theme !== null) {
      const result = theme === 'true' ? true : false;
      setDarkMode(result);
    }
    if (theme === null) createCookies();
  };

  useEffect(() => {
    checkTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    //  @ts-ignore
    <ThemeCreateContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeCreateContext.Provider>
  );
};
