import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Link, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { email, password });

      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);

        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard/');
        }
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error logging in:', error.response || error.message);
      if (error.response) {
        if (error.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordDialogOpen(true);
  };

  const handleForgotPasswordSubmit = async () => {
    setForgotPasswordDialogOpen(false);
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    try {
      await axios.post('/api/auth/forgotpassword', { email });
      setForgotPasswordSuccess('A new password has been sent to your email.');
      alert("A new password has been sent to your email.");
      
    } catch (error) {
      console.error('Error sending forgot password email:', error.response || error.message);
      alert('Error sending password reset email. Please try again later.');
    }
  };

  const handleForgotPasswordDialogClose = () => {
    setForgotPasswordDialogOpen(false);
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
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#00796b' }}>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: '#666666' }}>
          Please login to continue
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Loading...' : 'Login'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link
              component="button"
              variant="body2"
              sx={{ color: '#00796b' }}
              onClick={handleForgotPasswordClick}
            >
              Forgot password?
            </Link>
            <Link
              href="/signup"
              variant="body2"
              sx={{ color: '#00796b' }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>

      <Dialog open={forgotPasswordDialogOpen} onClose={handleForgotPasswordDialogClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            A new password will be sent to the following email address:
          </Typography>
          {forgotPasswordError && (
            <Alert severity="error">{forgotPasswordError}</Alert>
          )}
          {forgotPasswordSuccess && (
            <Alert severity="success">{forgotPasswordSuccess}</Alert>
          )}
          <TextField
            margin="dense"
            id="forgot-email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPasswordDialogClose} sx={{ color: '#00796b' }}>
            Cancel
          </Button>
          <Button onClick={handleForgotPasswordSubmit} sx={{ color: '#00796b' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default LoginPage;
