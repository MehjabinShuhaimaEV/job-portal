import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

const ApplicationDetailsPage = ({ application }) => {
  const [status, setStatus] = useState(application.status);
  const [comment, setComment] = useState('');

  const handleUpdate = () => {
    fetch(`/api/admin/user-applications/${application._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is included
      },
      body: JSON.stringify({ status, comment }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response, e.g., show a success message or update state
      console.log('Update successful', data);
    })
    .catch(error => console.error('Error updating application:', error));
  };

  return (
    <Paper sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4">Application Details</Typography>
      <TextField
        label="Applicant Name"
        value={application.name}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Job Title"
        value={application.jobTitle}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Application Date"
        value={new Date(application.date).toLocaleDateString()}
        fullWidth
        margin="normal"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handleUpdate}
      >
        Update Application
      </Button>
    </Paper>
  );
};

export default ApplicationDetailsPage;
