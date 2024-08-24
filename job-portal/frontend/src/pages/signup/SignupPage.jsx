import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styled components
const StyledContainer = styled(Container)({
  marginTop: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StyledBox = styled(Box)({
  padding: '2rem',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
});

const StyledButton = styled(Button)({
  backgroundColor: '#008080',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#006666',
  },
});

const Input = styled('input')({
  display: 'none',
});

const ProfilePictureWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '1rem',
});

const ProfilePictureButton = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: '#98D7C2',
  border: '2px solid #008080',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  marginBottom: '1rem',
  '&:hover': {
    backgroundColor: '#80c6b3',
  },
});

const ProfilePicture = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    skills: '',
    password: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files && files[0]) {
      setProfilePicture(files[0]);
      setProfilePicturePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupData = new FormData();
    for (const key in formData) {
      signupData.append(key, formData[key]);
    }
    if (profilePicture) {
      signupData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('/api/auth/signup', signupData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        alert('Successfully Completed signup');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
      alert('Error signing up: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledBox>
        <Typography variant="h4" gutterBottom align="center" color="#008080">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfilePictureWrapper>
                <ProfilePictureButton htmlFor="profilePicture">
                  {profilePicturePreview ? (
                    <ProfilePicture src={profilePicturePreview} alt="Profile Preview" />
                  ) : (
                    <Typography variant="body1" color="#008080">
                      Upload Picture
                    </Typography>
                  )}
                  <Input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </ProfilePictureButton>
              </ProfilePictureWrapper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                inputProps={{ maxLength: 10 }} 
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </StyledButton>
            </Grid>
          </Grid>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            <Link to="/login" style={{ textDecoration: 'none', color: '#008080' }}>
              Already have an account? Log in
            </Link>
          </Typography>
        </Box>
      </StyledBox>
    </StyledContainer>
  );
}

export default SignupPage;
