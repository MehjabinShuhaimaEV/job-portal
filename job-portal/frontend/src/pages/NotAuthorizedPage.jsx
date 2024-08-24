// src/pages/NotAuthorizedPage.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const NotAuthorizedPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Not Authorized</Typography>
      <Typography variant="body1">
        You do not have permission to view this page.
      </Typography>
    </Box>
  );
};

export default NotAuthorizedPage;
