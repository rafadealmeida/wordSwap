import IconButton from '@mui/material/IconButton/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ThemeContext } from '@/app/layout';

export const ToggleMode = () => {
  const themeContext = useContext(ThemeContext);
  const { darkMode, setDarkMode } = themeContext;
  const handleToogleTheme = (value: boolean) => {
    setDarkMode(!value);
    localStorage.setItem('USER_THEME_DARK', String(!value))
  };
  return (
    <IconButton
      sx={{ ml: 1, width: 'min-content', textAlign: 'center' }}
      onClick={() => handleToogleTheme(darkMode)}
      color="inherit"
    >
      {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
