import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Work as WorkIcon, AssignmentInd as AssignmentIndIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const sidebarColor = '#008080';

const AdminSidebar = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (typeof handleDrawerClose === 'function') {
      handleDrawerClose();
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0, // Adjust width based on the sidebar state
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 0, // Adjust width based on the sidebar state
          boxSizing: 'border-box',
          backgroundColor: sidebarColor,
          color: '#ffffff',
          overflowX: 'hidden',
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        },
      }}
    >
      <Box sx={{ padding: '16px', backgroundColor: sidebarColor, color: '#ffffff' }}>
        <Typography variant="h6">Admin Dashboard</Typography>
      </Box>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Manage Jobs', icon: <WorkIcon />, path: '/admin/manage-jobs' },
          { text: 'View Applications', icon: <AssignmentIndIcon />, path: '/admin/view-applications' },
          { text: 'Logout', icon: <ExitToAppIcon />, path: '/login' }
        ].map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            onClick={() => handleNavigation(path)}
            sx={{ color: '#ffffff' }}
          >
            <ListItemIcon>{React.cloneElement(icon, { sx: { color: '#ffffff' } })}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
