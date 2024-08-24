import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, Typography, IconButton } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      {/* Sidebar */}
      <AdminSidebar 
        open={true} 
        onClose={handleDrawerClose}
      />
      
      <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* Top Toolbar */}
        {isSmallScreen && (
          <Toolbar>
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        )}
        
        {/* Main Content Area */}
        <Outlet /> {/* Renders the child routes */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
