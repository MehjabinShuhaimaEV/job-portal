import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#005B5B',
  boxShadow: 'none',
}));

const DrawerContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  right: 0,
  top: 0,
  width: drawerWidth,
  height: '100%',
  backgroundColor: '#B2DFDB',
  color: '#004D40',
  transition: 'transform 0.3s ease',
  transform: 'translateX(100%)',
  zIndex: 1300,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
}));

const DrawerOpen = styled(DrawerContainer)(({ theme }) => ({
  transform: 'translateX(0)',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'flex-end',
}));

const UserProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#E0F2F1',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
}));

const UserDetails = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

const UserDetailItem = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const getIcon = (text) => {
  switch (text) {
    case 'Browse Jobs':
      return <SearchIcon />;
    case 'Applied Jobs':
      return <PlaylistAddCheckIcon />;
    case 'Save Jobs':
      return <BookmarkIcon />;
    case 'Log Out':
      return <LogoutIcon />;
    default:
      return null;
  }
};

export default function Dashboard() {
  const theme = useTheme();
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/browse-jobs');
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/api/user/profile', { headers });
        const userData = response.data;

        if (userData.profilePicture) {
          userData.profilePicture = userData.profilePicture.replace(/\\/g, '/');
        }

        setUserProfile(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(`/dashboard/${path}`);
  };

  const handleRightDrawerOpen = () => {
    setRightDrawerOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            JobQuest
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleRightDrawerOpen}
          >
            <PersonIcon fontSize="medium" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DrawerContainer style={{ transform: rightDrawerOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <DrawerHeader>
          <IconButton onClick={handleRightDrawerClose} style={{ color: '#004D40' }}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider style={{ backgroundColor: '#004D40' }} />
        <List>
          <ListItem>
            <UserProfileContainer elevation={3}>
              {userProfile && (
                <Avatar
                  src={userProfile.profilePicture ? `http://localhost:5000/${userProfile.profilePicture}` : '/path/to/default-picture.jpg'}
                  sx={{ width: 100, height: 100 }}
                />
              )}
              <Typography variant="h6" gutterBottom>
                {userProfile?.name || 'User Name'}
              </Typography>
              <UserDetails>
                <UserDetailItem>
                  <Typography variant="body2" color="textSecondary">Address: {userProfile?.address || 'User Address'}</Typography>
                </UserDetailItem>
                <UserDetailItem>
                  <Typography variant="body2" color="textSecondary">Phone: {userProfile?.phone || 'User Phone'}</Typography>
                </UserDetailItem>
                <UserDetailItem>
                  <Typography variant="body2" color="textSecondary">Email: {userProfile?.email || 'User Email'}</Typography>
                </UserDetailItem>
                <UserDetailItem>
                  <Typography variant="body2" color="textSecondary">Education: {userProfile?.education || 'User Education'}</Typography>
                </UserDetailItem>
                <UserDetailItem>
                  <Typography variant="body2" color="textSecondary">Skills: {userProfile?.skills || 'User Skills'}</Typography>
                </UserDetailItem>
              </UserDetails>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleListItemClick(null, 'updateprofile')}>
                  <ListItemIcon style={{ color: '#004D40' }}>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Profile" />
                </ListItemButton>
              </ListItem>
            </UserProfileContainer>
          </ListItem>

          <Divider style={{ backgroundColor: '#004D40' }} />

          {[
            { text: 'Browse Jobs', path: '' },
            { text: 'Applied Jobs', path: 'applied-jobs' },
            { text: 'Save Jobs', path: 'savejobs' },
            { text: 'Log Out', path: '' },
          ].map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedIndex === index}
            >
              <ListItemButton
                onClick={() => {
                  if (item.text === 'Log Out') {
                    handleLogout();
                  } else {
                    handleListItemClick(index, item.path);
                  }
                }}
              >
                <ListItemIcon style={{ color: '#004D40' }}>
                  {getIcon(item.text)}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerContainer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#F5F5F5',
          p: 3,
          paddingTop: theme.spacing(12),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          marginRight: rightDrawerOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
