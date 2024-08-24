import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    Container, TextField, Button, Typography, Grid,
    Paper, Box, CircularProgress, Snackbar, Alert
} from '@mui/material';

const JobFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const jobId = queryParams.get('id');

    const [job, setJob] = useState({
        company: '',
        position: '',
        jobTitle: '',
        description: '',
        requirements: '',
        location: '',
        salary: '',
        jobType: ''
    });

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (jobId) {
            setLoading(true);
            axios.get(`/api/jobs/${jobId}`)
                .then(response => {
                    setJob(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching job:', error);
                    setLoading(false);
                    setSnackbarMessage('Error fetching job details.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        }
    }, [jobId]);

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (jobId) {
            axios.put(`/api/jobs/updatejob/${jobId}`, job)
                .then(() => {
                    setLoading(false);
                    navigate('/admin/manage-jobs');
                })
                .catch(error => {
                    console.error('Error updating job:', error);
                    setLoading(false);
                    setSnackbarMessage('Error updating job.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        } else {
            axios.post('/api/jobs/createjob', job)
                .then(() => {
                    setLoading(false);
                    navigate('/admin/manage-jobs');
                })
                .catch(error => {
                    console.error('Error creating job:', error);
                    setLoading(false);
                    setSnackbarMessage('Error creating job.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container component={Paper} elevation={3} sx={{
            padding: '30px',
            borderRadius: '8px',
            maxWidth: '600px',
            marginTop: '40px', // Added margin for better spacing
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px', color: '#004d40' }}>
                {jobId ? 'Edit Job' : 'Add New Job'}
            </Typography>
            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', marginBottom: '20px' }} />}
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Company"
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Position"
                            name="position"
                            value={job.position}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Job Title"
                            name="jobTitle"
                            value={job.jobTitle}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Requirements"
                            name="requirements"
                            value={job.requirements}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Location"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Salary"
                            name="salary"
                            value={job.salary}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Job Type"
                            name="jobType"
                            value={job.jobType}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                padding: '10px',
                                borderRadius: '20px',
                                background: 'linear-gradient(45deg, #00bcd4 30%, #004d40 90%)',
                                color: '#fff',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #00acc1 30%, #003d33 90%)'
                                }
                            }}
                        >
                            {jobId ? 'Update Job' : 'Create Job'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                sx={{ marginTop: '20px' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default JobFormPage;
