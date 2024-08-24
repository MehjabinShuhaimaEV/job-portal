import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  IconButton,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Tooltip,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ManageJobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDelete = async (jobId) => {
    setDeleteJobId(jobId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/jobs/deletejob/${deleteJobId}`);
      if (response.status === 200) {
        setSnackbarMessage('Job deleted successfully!');
        setSnackbarSeverity('success');
        fetchJobs();
      } else {
        setSnackbarMessage('Error in deleting job');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage('Error: Failed to delete job.');
      setSnackbarSeverity('error');
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
            borderBottom: '3px solid #008080',
          }}
        >
          Manage Jobs
        </Typography>
        <Tooltip title="Add a new job" arrow>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/manage-jobs/form')}
            sx={{
              background: 'linear-gradient(45deg, #00bcd4 30%, #004d40 90%)',
              borderRadius: '20px',
              padding: '10px 20px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00acc1 30%, #003d33 90%)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Add New Job
          </Button>
        </Tooltip>
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'auto',
          backgroundColor: '#E0F2F1',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Company</TableCell> {/* New Company Column */}
                <TableCell>Description</TableCell>
                <TableCell>Position</TableCell> {/* New Position Column */}
                <TableCell>Requirements</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Job Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>{job.company}</TableCell> {/* Display Company */}
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{job.position}</TableCell> {/* Display Position */}
                  <TableCell>{job.requirements}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.jobType}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Job" arrow>
                      <IconButton
                        onClick={() => navigate(`/admin/manage-jobs/form?id=${job._id}`)}
                        color="primary"
                        sx={{
                          color: '#004d40',
                          '&:hover': {
                            backgroundColor: '#b2dfdb',
                            color: '#004d40',
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Job" arrow>
                      <IconButton
                        onClick={() => handleDelete(job._id)}
                        color="secondary"
                        sx={{
                          color: '#d32f2f',
                          '&:hover': {
                            backgroundColor: '#ffbaba',
                            color: '#d32f2f',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this job?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageJobsPage;
