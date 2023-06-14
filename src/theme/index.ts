import createTheme from '@mui/material/styles/createTheme';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#427cde',
    },
    secondary: {
      main: '#c7074b',
    },
    error: {
      main: '#FF8077',
    },
    success: {
      main: '#56C435',
    },
    info: {
      main: '#8093FC',
    },
    warning: {
      main: '#FFA100',
    },
  },
});


export const ligthTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#427cde',
    },
    secondary: {
      main: '#c7074b',
    },
    error: {
      main: '#FF8077',
    },
    success: {
      main: '#56C435',
    },
    info: {
      main: '#8093FC',
    },
    warning: {
      main: '#FFA100',
    },
  },
});
