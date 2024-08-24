import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Send a request to the backend to initiate the password reset process
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('A password reset link has been sent to your email address.');
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
      console.error('Error sending reset link:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#00796b' }}>
          Forgot Password
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: '#666666' }}>
          Enter your email address to reset your password
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleForgotPassword} sx={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              padding: '10px 0',
              background: 'linear-gradient(135deg, #00796b, #48a999)',
              '&:hover': { background: 'linear-gradient(135deg, #005f56, #3b8c7c)' },
              color: '#ffffff',
            }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPasswordPage;
