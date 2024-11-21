import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cliente
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* DRAWER PRA MOBILE ABAIXO */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
              color: '#e0dfdf'
             },
          }}
        >
          <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 2,
          }}
        ><button onClick={handleDrawerClose}>
          <CloseIcon sx={{color: '#e0dfdf'}} />
        </button></Toolbar>
          <List>
            <Link to={'/home-cliente'}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Home"}/>
            </ListItemButton>
            </Link>

            <Link to={'/agendamentos-cliente'}>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Agendamentos"}/>
            </ListItemButton>
            </Link>

            <Link to={'/favoritos'}>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Favoritos"}/>
            </ListItemButton>
            </Link>

            <Link to={'/notificacoes-cliente'}>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Notificações"}/>
            </ListItemButton>
            </Link>
          </List>
        <Divider sx={{backgroundImage: 'linear-gradient(260deg, rgba(0,0,0,1) 0%, rgba(17,17,17,1) 100%)',
          height: '5px'
        }} />
        <Link to={'/'}>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Sair"}/>
            </ListItemButton>
          </Link>
        </Drawer>
        {/* DRAWER PRA DESKTOP ABAIXO */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
              color: '#e0dfdf'
             },
          }}
          open
        >
            <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 2,
          }}
        ></Toolbar>
          <List>
            <Link to={'/home-cliente'}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Home"}/>
            </ListItemButton>
            </Link>

            <Link to={'/agendamentos-cliente'}>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon sx={{color: '#e0dfdf'}}/>
              </ListItemIcon>
              <ListItemText primary={"Agendamentos"}/>
            </ListItemButton>
            </Link>

            <Link to={'/favoritos'}>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon sx={{color: '#e0dfdf'}} />
              </ListItemIcon>
              <ListItemText primary={"Favoritos"}/>
            </ListItemButton>
            </Link>

            <Link to={'/notificacoes-cliente'}>
            <ListItemButton>
              <ListItemIcon>
                <NotificationsIcon sx={{color: '#e0dfdf'}} />
              </ListItemIcon>
              <ListItemText primary={"Notificações"}/>
            </ListItemButton>
            </Link>
          </List>
        <Divider sx={{backgroundImage: 'linear-gradient(260deg, rgba(0,0,0,1) 0%, rgba(17,17,17,1) 100%)',
          height: '5px'
        }}/>
        <Link to={'/'}>
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon sx={{color: '#e0dfdf'}} />
              </ListItemIcon>
              <ListItemText primary={"Sair"}/>
            </ListItemButton>
          </Link>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, // Padding para espaçamento interno
          backgroundColor: '#fff',
          mt: { xs: 7, sm: 8 }, // Margem superior para evitar sobreposição com o AppBar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;