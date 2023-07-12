'use server';
import { cookies } from 'next/headers';

const cookieStore = cookies();

export async function createCookies() {
  // @ts-ignore
  cookies().set('USER_THEME_DARK', 'false');
}
export async function toggleCookiesDark(value: boolean) {
  // @ts-ignore
  cookies().set('USER_THEME_DARK', String(!value));
}

export async function getCookieTheme() {
  const darkMode = cookieStore.get('USER_THEME_DARK')
  if (!darkMode) {
    await createCookies();
    const newDarkmode = cookieStore.get('USER_THEME_DARK')
    return newDarkmode;
  } else {
    return darkMode;
  }
}
