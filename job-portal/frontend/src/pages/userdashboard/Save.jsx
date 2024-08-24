import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Save = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/api/user/getSavedjobs', { headers });
        setSavedJobs(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleCardClick = (job) => {
    navigate(`/job/${job._id}`, { state: { job, hideButtons: false, isSaved: true } });
  };

  const handleRemoveJob = async (jobId) => {
    try {
      console.log(jobId);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(`/api/user/removeSavedjob/${jobId}`, { headers });
      setSavedJobs(response.data); // Update saved jobs list after removal
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#008080' }}>
        Saved Jobs
      </Typography>
      {savedJobs.length === 0 ? (
        <Typography>No jobs saved yet.</Typography>
      ) : (
        savedJobs.map((job) => (
          <Paper
            key={job._id}
            elevation={3}
            style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f5f5f5', cursor: 'pointer' }}
          >
            <Box onClick={() => handleCardClick(job)}>
              <Typography variant="h6" gutterBottom style={{ color: '#008080' }}>
                {job.jobTitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {job.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Requirements:</strong> {job.requirements}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {job.location}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Job type:</strong> {job.jobType}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Salary:</strong> {job.salary}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              style={{ borderColor: '#008080', color: '#008080' }}
              onClick={() => handleRemoveJob(job._id)}
            >
              Remove
            </Button>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default Save;
