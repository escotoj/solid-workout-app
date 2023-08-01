// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom'

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ backgroundColor: 'red' }}>
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           {/* <Button color="inherit" component={Link} to="/login">Login</Button> */}
//           {/* <Button color="inherit">Sign Up</Button> */}
//           <Button color="inherit" component={Link} to="/login">Login</Button>
//           <Button color="inherit" component={Link} to="/exercises">Exercises</Button>
//           <Button color="inherit" component={Link} to="/gains">Gains</Button>
//           <Button color="inherit" component={Link} to="/log">Log</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }



import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const pages = [
  { label: 'Home', path: '/'},
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
  { label: 'Exercises', path: '/exercises' },
];

const settings = [
  { label: 'Home', path: '/'},
  { label: 'Gains', path: '/gains' },
  { label: 'Log', path: '/log' },
  { label: 'Exercises', path: '/exercises' },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = Boolean(localStorage.getItem('id_token'));
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    setIsLoggedIn(false);

    window.location.href = '/login';
  };

  const navigationLinks = isLoggedIn ? [
    { label: 'Home', path: '/' },
    { label: 'Gains', path: '/gains' },
    { label: 'Exercises', path: '/Exercises' },
    { label: 'Log', path: '/log' }
  ] : pages;

  return (
    <AppBar position="static" sx={{ backgroundColor: 'red'}}>
      <Container >
        <div>

          <Toolbar disablegutters="true" >
            <Tooltip title="Home Page">
              <IconButton
                component={Link}
                to="/"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  position: 'relative',
                  left: "-0.75rem",
                }}
              >
              </IconButton>
            </Tooltip>

{/* This box below handles the navbar structure */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' }, minWidth: '35rem', marginLeft: '30rem', marginRight: '30rem',  }}>
              {navigationLinks.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.path}
                  sx={{
                    color: '#f2f2f2',
                    display: 'block',
                    fontSize: '1.1rem',
                    '&:hover': {
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: '0 0 1px #ffffff',
                      border: '1px solid #b2aa9d',
                    },
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box id="navBarSignOut" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {isLoggedIn ? (
                <Tooltip title="Sign Out">
                  <Button
                    onClick={handleLogout}
                    sx={{
                      fontSize: '1.5rem',
                      p: 0,
                      marginRight: '-1rem',
                      color: '#ffffff',
                      minWidth: '8rem',
                      background: 'transparent',
                      position: 'absolute',
                      padding: '0.25rem, 0',
                      borderRadius: '0.5rem',
                      right: 0,
                      '&:hover': {
                        fontWeight: '800',
                        fontSize: '1.75rem',
                        color: '#ffffff',
                        textShadow: '0 0 1px #ffffff, 0 0 2px #ffffff, 0 0 3px #ffffff',
                        border: '1px solid #b2aa9d',
                      }
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: '1.35rem',
                        '&:hover': {
                          fontStyle: 'bold',
                        }
                      }}
                      alt="Sign Out"
                    >Sign Out
                    </Typography>
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    fontSize: '1.1rem',
                    color: '#f2f2f2',
                    '&:hover': {
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: '0 0 1px #ffffff',
                      border: '1px solid #b2aa9d',
                    },
                  }}
                >
                  {/* Login */}
                </Button>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
              >
                {/* {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={setting.path}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))} */}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {navigationLinks.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to={page.path}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
            </Typography>
          </Toolbar>
        </div>
      </Container>
    </AppBar>
  );
}