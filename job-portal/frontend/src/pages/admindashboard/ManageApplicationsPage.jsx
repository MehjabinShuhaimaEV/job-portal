import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';

// Teal Color Scheme
const tealColor = '#004d40'; // Dark Teal
const tealLight = '#b2dfdb'; // Light Teal

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: tealLight,
}));

const StyledButton = styled(Button)(({ theme, color }) => ({
  backgroundColor: color === 'success' ? '#004d40' : '#d32f2f', // Dark Teal for accept, Red for reject
  color: '#ffffff',
  '&:hover': {
    backgroundColor: color === 'success' ? '#00332e' : '#b71c1c', // Darker shades on hover
  },
}));

const ManageApplicationsPage = () => {
  const [application, setApplication] = useState(null);
  const { id } = useParams(); // Get the application ID from the route
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch application details
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`/api/admin/application/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data)
        setApplication(response.data);
        
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    fetchApplication();
  }, [id]);

  const handleAccept = async () => {
    try {
      await axios.post(
        `/api/admin/application/${id}/accept`,
        {}, // No data is being sent in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/admin/view-applications');
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(
        `/api/admin/application/${id}/reject`,
        {}, // No data is being sent in the body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/admin/view-applications');
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  if (!application) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <StyledPaper>
        <Typography variant="h5" gutterBottom style={{ color: tealColor }}>
          Application Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Applicant Name:</strong> {application.user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Job Title:</strong> {application.job.jobTitle}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Application Date:</strong> {new Date(application.appliedAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Status:</strong> {application.status}
        </Typography>
       
        <Box style={{ marginTop: '20px' }}>
          <StyledButton
            variant="contained"
            color="success"
            onClick={handleAccept}
            style={{ marginRight: '10px' }}
          >
            Accept
          </StyledButton>
          <StyledButton
            variant="contained"
            color="error"
            onClick={handleReject}
          >
            Reject
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ManageApplicationsPage;
