'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useCallback, useEffect, useState } from 'react';
import { ToggleMode } from './ToggleModeTheme';
import { getAuth } from 'firebase/auth';
import { app } from '@/service/firebase';
import { Avatar } from '@mui/material';

const authUser = getAuth(app);

export const NAV_BAR_HEIGHT = 50;

const LOGO_URL = '/imagens/Logo.png';

export default function NavBar() {
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);
  setTimeout(() => {
    forceUpdate();
  }, 1000);
  // const [auth, setAuth] = useState(true);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: NAV_BAR_HEIGHT,
        // height: '5vh',
        alignItems: 'center',
        ' & .css-hyum1k-MuiToolbar-root': {
          minHeight: 0,
        },
      }}
    >
      <AppBar
        position="static"
        sx={{ height: NAV_BAR_HEIGHT }}
      >
        <Toolbar sx={{marginTop:-1}}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Avatar
            alt="Logo Simplifica Doc"
            variant="square"
            src={LOGO_URL}
            sx={{ width: 24, height: 24 , marginRight:'0.3rem'}}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SimplificaDoc
          </Typography>
          {/* <FormGroup>
            <FormControlLabel
            control={
              <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                  />
                }
                label={auth ? 'Logout' : 'Login'}
                />
              </FormGroup> */}
          {/* <ToggleMode /> */}

          {/* {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </div>
          )} */}

          {authUser.currentUser && (
            <Typography variant="h6" component="div">
              Olá,{authUser.currentUser?.displayName}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
