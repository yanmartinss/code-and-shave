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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

    const { usuarioLogado, logout } = useAuth();

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

    const container = window !== undefined ? () => window().document.body : undefined;

    const confirmLogout = () => {
        logout();
        setLogoutModalOpen(false);
        navigate('/');
    }

    const menuItems = () => {
        switch (usuarioLogado?.tipo) {
            case 'cliente':
                return [
                    { text: 'Início', icon: <HomeIcon sx={{ color: '#e0dfdf' }} />, path: '/home-cliente' },
                    { text: 'Agendamentos', icon: <BookIcon sx={{ color: '#e0dfdf' }} />, path: '/agendamentos-cliente' },
                    { text: 'Gerenciar Perfil', icon: <PersonIcon sx={{ color: '#e0dfdf' }} />, path: '/perfil-cliente' },
                    { text: 'Notificações', icon: <NotificationsIcon sx={{ color: '#e0dfdf' }} />, path: '/notificacoes-cliente' },
                ];
            case 'barbearia':
                return [
                    { text: 'Início', icon: <HomeIcon sx={{ color: '#e0dfdf' }} />, path: '/home-barbearia' },
                    { text: 'Agendamentos', icon: <BookIcon sx={{ color: '#e0dfdf' }} />, path: '/agendamentos-barbearia' },
                    { text: 'Clientes', icon: <AppRegistrationIcon sx={{ color: '#e0dfdf' }} />, path: '/clientes-cadastrados' },
                    { text: 'Gestão', icon: <ManageAccountsIcon sx={{ color: '#e0dfdf' }} />, path: '/gestao-barbearia' },
                ];
            case 'barbeiro':
                return [
                    { text: 'Início', icon: <HomeIcon sx={{ color: '#e0dfdf' }} />, path: '/home-barbeiro' },
                    { text: 'Agendamentos', icon: <BookIcon sx={{ color: '#e0dfdf' }} />, path: '/agendamentos-barbeiro' },
                    { text: 'Favoritos', icon: <FavoriteIcon sx={{ color: '#e0dfdf' }} />, path: '/favoritos-barbeiro' },
                ];
            default:
                return [];
        }
    };

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
                <Toolbar
                    sx={{
                        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontSize: '24px', paddingRight: '10px', textTransform: 'uppercase', fontFamily: 'open sans' }}>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
                            color: '#e0dfdf',
                        },
                    }}
                >
                    <Toolbar>
                        <button onClick={handleDrawerClose}>
                            <CloseIcon sx={{ color: '#e0dfdf' }} />
                        </button>
                    </Toolbar>
                    <List>
                        {menuItems().map((item, index) => (
                            <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </Link>
                        ))}
                        <Divider />
                        <ListItemButton onClick={() => setLogoutModalOpen(true)}>
                            <ListItemIcon>
                                <ExitToAppIcon sx={{ color: '#e0dfdf' }} />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </List>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
                            color: '#e0dfdf',
                        },
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" sx={{ color: '#e0dfdf' }}>
                            Code & Shave 💈
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        {menuItems().map((item, index) => (
                            <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </Link>
                        ))}
                        <Divider />
                        <ListItemButton onClick={() => setLogoutModalOpen(true)}>
                            <ListItemIcon>
                                <ExitToAppIcon sx={{ color: '#e0dfdf' }} />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </List>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#fff',
                    mt: { xs: 7, sm: 8 },
                }}
            >
                <Outlet />
            </Box>
            <Dialog open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
                <DialogTitle>Confirmação de Logout</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja sair?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmLogout} sx={{color: '#AC2020'}}>
                        Sair
                    </Button>
                    <Button onClick={() => setLogoutModalOpen(false)} sx={{color: "#24952E"}}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;