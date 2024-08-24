import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function JobForm({ job, onSuccess }) {
  const [title, setTitle] = useState(job ? job.title : '');
  const [description, setDescription] = useState(job ? job.description : '');
  const [requirements, setRequirements] = useState(job ? job.requirements : '');
  const [location, setLocation] = useState(job ? job.location : '');
  const [salary, setSalary] = useState(job ? job.salary : '');
  const [type, setType] = useState(job ? job.type : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (job) {
        await axios.put(`/api/jobs/${job._id}`, { title, description, requirements, location, salary, type });
      } else {
        await axios.post('/api/jobs', { title, description, requirements, location, salary, type });
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: 'auto' }}>
      <TextField
        label="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
      />
      <TextField
        label="Requirements"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        multiline
        rows={4}
        required
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <TextField
        label="Salary"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />
      <FormControl required>
        <InputLabel>Job Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="Full-time">Full-time</MenuItem>
          <MenuItem value="Part-time">Part-time</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </Box>
  );
}

export default JobForm;
