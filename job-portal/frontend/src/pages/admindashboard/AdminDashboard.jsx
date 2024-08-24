import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, CssBaseline } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
    pendingApplications: 0,
  });

  const handleSidebarToggle = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard-stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cardStyles = {
    background: 'linear-gradient(135deg, #004d40, #008080)',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const statCards = [
    { title: 'Total Job Listings', value: stats.totalJobs },
    { title: 'Total Applications', value: stats.totalApplications },
    { title: 'Active Jobs', value: stats.activeJobs },
    { title: 'Pending Applications', value: stats.pendingApplications },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSidebar open={open} handleDrawerClose={handleSidebarToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s ease',
          marginLeft: open ? 240 : 0,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#004d40',
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(90deg, #004d40, #008080)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Admin Dashboard
        </Typography>
        <Grid container spacing={4}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card sx={cardStyles}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
