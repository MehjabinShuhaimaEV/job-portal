import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Applied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch applied jobs from the backend
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('/api/user/applied-jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data);
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#008080' }}>
        Applied Jobs
      </Typography>
      {appliedJobs?.length === 0 ? (
        <Typography>No jobs applied yet.</Typography>
      ) : (
        appliedJobs?.map((appliedJob, index) => (
          <Paper
            key={index}
            elevation={3}
            style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f5f5f5', cursor: 'pointer' }}
            
          >
            <Typography variant="h6" gutterBottom style={{ color: '#008080' }}>
              {appliedJob.job.jobTitle}
            </Typography>
            <Typography variant="body1" gutterBottom><strong>Description:</strong> {appliedJob.job.description}</Typography>
            <Typography variant="body1" gutterBottom><strong>Requirements:</strong> {appliedJob.job.requirements}</Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Company:</strong> {appliedJob.job.company}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Salary:</strong> {appliedJob.job.salary}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Position:</strong> {appliedJob.job.jobType}
            </Typography>
            <Typography variant="body1" >
              <strong>Location:</strong> {appliedJob.job.location}
            </Typography>
            <Typography
              variant="body1"
              style={{
                color:
                  appliedJob.status === 'Rejected' ? 'red' :
                  appliedJob.status === 'Accepted' ? 'green' :
                  'blue',
              }}
            >
              <strong style={{ color: "Black" }}>Status:</strong> {appliedJob.status}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default Applied;
