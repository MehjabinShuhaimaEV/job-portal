import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  console.log("job contains",job._id)
  useEffect(() => {
    const fetchSavedAndAppliedStatus = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found, user is not authenticated');
          return;
        }
        // Check if the job is already applied for by the user
        

        // Check if the job is already saved by the user
        const savedResponse = await axios.get(`/api/user/saved-jobs/${job._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaved(savedResponse.data.isSaved);
        const appliedResponse = await axios.get(`/api/user/check-applied/${job._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("applied jobs:",appliedResponse.data.isApplied)
        setApplied(appliedResponse.data.isApplied);

        
        } catch (error) {
        console.error('Error checking saved/applied job status:', error);
        }
        };

    fetchSavedAndAppliedStatus();
  }, [job._id]);

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/user/savejob/${job._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleApplyClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/user/applyjob/${job._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplied(true);
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '30px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#008080' }}>
          {job.jobTitle}
        </Typography>
        <Typography variant="body1"><strong>Company:</strong> {job.company}</Typography>
        <Typography variant="body1" gutterBottom><strong>Description:</strong> {job.description}</Typography>
        <Typography variant="body1"><strong>Position:</strong> {job.position}</Typography>
        <Typography variant="body1" gutterBottom><strong>Requirements:</strong> {job.requirements}</Typography>
        <Typography variant="body1" gutterBottom><strong>Location:</strong> {job.location}</Typography>
        <Typography variant="body1" gutterBottom><strong>Job type:</strong> {job.jobType}</Typography>
        <Typography variant="body1" gutterBottom><strong>Salary:</strong> {job.salary}</Typography>
       
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          {applied ? (
            <Typography variant="body1" style={{ color: '#008080', alignSelf: 'center' }}>
              Applied
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyClick}
              style={{ backgroundColor: '#008080', color: '#fff' }}
            >
              Apply
            </Button>
          )}

          {saved ? (
            <Typography variant="body1" style={{ color: '#008080', alignSelf: 'center' }}>
              SAVED
            </Typography>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSaveClick}
              style={{ borderColor: '#008080', color: '#008080' }}
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default JobDetailPage;
