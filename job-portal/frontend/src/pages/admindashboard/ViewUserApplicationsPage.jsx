import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Teal Color Scheme
const tealColor = '#004d40'; // Dark Teal
const tealLight = '#E0F2F1'; // Light Teal Background
const buttonGradient = 'linear-gradient(45deg, #00bcd4 30%, #004d40 90%)'; // Button Gradient

// Styled components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: tealLight, // Light Teal Hover Effect
  },
}));

const StyledTableHead = styled(TableRow)(({ theme }) => ({
  backgroundColor: tealColor, // Dark Teal
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: 'black',
  fontWeight: 'bold',
}));

const ViewUserApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/admin/user-applications', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error('Error fetching applications:', error));
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/admin/application/${id}`);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: '0 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#004d40',
            fontWeight: 'bold',
            padding: '20px',
            borderBottom: `3px solid ${tealColor}`,
          }}
        >
          User Applications
        </Typography>
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'auto',
          backgroundColor: tealLight,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Table stickyHeader>
            <TableHead>
              <StyledTableHead>
                <StyledTableCell><strong>Applicant Name</strong></StyledTableCell>
                <StyledTableCell><strong>Job Title</strong></StyledTableCell>
                <StyledTableCell><strong>Application Date</strong></StyledTableCell>
                <StyledTableCell><strong>Status</strong></StyledTableCell>
                <StyledTableCell><strong>Actions</strong></StyledTableCell>
              </StyledTableHead>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <StyledTableRow key={app._id}>
                  <TableCell>{app.user.name}</TableCell>
                  <TableCell>{app.job.jobTitle}</TableCell>
                  <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details" arrow>
                      <Button
                        variant="contained"
                        onClick={() => handleViewDetails(app._id)}
                        sx={{
                          background: "#008080",
                          borderRadius: '20px',
                          padding: '5px 15px',
                          textTransform: 'none',
                          color: '#ffffff',
                          '&:hover': {
                            background: buttonGradient,
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                          },
                        }}
                      >
                        View
                      </Button>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ViewUserApplicationsPage;
