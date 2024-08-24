import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Toolbar, Divider, CssBaseline } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;
const miniDrawerWidth = 60;

function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ mr: 2 }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : miniDrawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button component={Link} to="/browse-jobs">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Browse Jobs" sx={{ display: open ? 'block' : 'none' }} />
          </ListItem>
          <ListItem button component={Link} to="/applied-jobs">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="View Applied Jobs" sx={{ display: open ? 'block' : 'none' }} />
          </ListItem>
          <ListItem button component={Link} to="/update-profile">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" sx={{ display: open ? 'block' : 'none' }} />
          </ListItem>
          <ListItem button onClick={() => localStorage.removeItem('token')}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" sx={{ display: open ? 'block' : 'none' }} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;
