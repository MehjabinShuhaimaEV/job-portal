import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, useMediaQuery, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Only show "Login" and "Signup" on the homepage
  const isHomePage = location.pathname === '/';

  return (
    <AppBar position="static" style={{ backgroundColor: '#ffffff', height: '64px' }}>
      <Toolbar style={{ minHeight: '64px' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: '#008080' }}>
          JobQuest
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              style={{ color: '#008080' }} // Set the menu icon color to teal
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/" onClick={handleClose} style={{ color: '#008080' }}>Home</MenuItem>
              {isHomePage && (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleClose} style={{ color: '#008080' }}>Login</MenuItem>
                  <MenuItem component={Link} to="/signup" onClick={handleClose} style={{ color: '#008080' }}>Signup</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <div>
            {isHomePage && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  style={{
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #00796b, #48a999)', // Teal gradient
                    borderRadius: '5px',
                    margin: '0 8px',
                    padding: '6px 16px',
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  style={{
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #00796b, #48a999)', // Teal gradient
                    borderRadius: '5px',
                    margin: '0 8px',
                    padding: '6px 16px',
                  }}
                >
                  Signup
                </Button>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
