import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)({
  marginTop: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const StyledBox = styled(Box)({
  padding: '2rem',
  backgroundColor: '#f4f6f8',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#008080',
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

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    skills: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const user = response.data;
        setUserDetails({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          address: user.address || '',
          education: user.education || '',
          skills: user.skills || '',
        });

        // If user has a profile picture, set it as the preview
        if (user.profilePicture) {
          setProfilePicturePreview(`http://localhost:5000/${user.profilePicture.replace(/\\/g, '/')}`);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture' && files && files[0]) {
      setProfilePicture(files[0]);
      setProfilePicturePreview(URL.createObjectURL(files[0]));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in userDetails) {
      formData.append(key, userDetails[key]);
    }
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('/api/user/updateUserdata', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully');
        navigate('/dashboard/', { replace: true });
        window.location.reload();
      } else {
        alert('Profile update failed');
        navigate('/dashboard/', { replace: true });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledBox>
        <Typography variant="h4" gutterBottom align="center" color="#008080">
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={userDetails.name}
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
                value={userDetails.email}
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
                value={userDetails.phone}
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
                value={userDetails.address}
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
                value={userDetails.education}
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
                value={userDetails.skills}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton type="submit" variant="contained" color="primary" fullWidth>
                Update Profile
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};

export default UpdateProfile;
