import React from 'react';
import { Meteor } from 'meteor/meteor';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 210;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})(
  ({ theme, open }) => ({
    backgroundColor: '#012E40',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));

import Badge from '@mui/material/Badge';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Scaffold ({user}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const imageURL = user.profile?.image || "../images/profile.png";

  const pages = [
    {name: 'Início',  icon: <HomeIcon />, link: 'home'},
    {name: 'Perfil',  icon: <PersonIcon />, link: 'profile'},
    {name: 'Tarefas', icon: <PlaylistAddCheckIcon />, link: 'tasks'},
  ]

  const [page, setPage] = React.useState(window.location.pathname.split('/')[1]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function gotoLink(link) {
    setPage(link);
    navigate(link);
  }

  return (
    <Box sx={{ display: 'flex' }}>
     <CssBaseline />
     <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <button 
            onClick={() => gotoLink('home')} 
            style={{margin: 'auto'}} 
            className='button-simple'
          >
              <Typography variant="h6" noWrap component="div" style={{color:'white'}}>
                What I need TO DO
              </Typography>
          </button>
          <button 
            onClick={() => gotoLink('profile')} 
            style={{...(open && {display: 'none'})}} 
            className='button-simple'
          >
              <Avatar alt="Remy Sharp" src={imageURL}/>
          </button>
        </Toolbar>
      </AppBar>

     <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{marginBottom: '20px'}}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                style={{margin: 'auto'}}
            >
                <Avatar 
                    alt="Imagem de Perfil" 
                    src={imageURL} 
                    style={{margin: 'auto', width: '100px', height: '100px'}}
                />
            </StyledBadge>
          <IconButton onClick={handleDrawerClose} style={{position:'absolute'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        {(user?.profile?.name || user?.username) && <h4 style={{margin: '5px auto'}}>Olá {user?.profile?.name || user?.username}</h4>}
        {(user?.email || user?.profile?.email) && <h6 style={{margin: '5px auto'}}>{user?.email || user?.profile?.email}</h6>}

        <List>
          {pages.map((task, index) => (
            <ListItem key={index} disablePadding style={{...(page == task.link && {backgroundColor: '#E8E9FC'})}}>
              <ListItemButton onClick={() => gotoLink(task.link)}>
                <ListItemIcon>
                  {task.icon}
                </ListItemIcon>
                <ListItemText primary={task.name}/>
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <Button 
              color="primary" 
              style={{marginLeft: 'auto', marginTop: '20px', marginRight: '10px'}}
              onClick={() => Meteor.logout()}
              >
                Sair
              </Button>
          </ListItem>
        </List>
      </Drawer>


      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}


