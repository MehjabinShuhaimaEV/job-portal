import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Drawer,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import './BrowseJobPage.css';

const BrowseJob = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [salaryLevel, setSalaryLevel] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [industry, setIndustry] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const debouncedSearch = _.debounce((query) => {
    setSearchQuery(query);
    applyFilters();
  }, 300);

  const handleSearchQueryChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSalaryLevelChange = (event) => {
    setSalaryLevel(event.target.value);
  };

  const handleExperienceLevelChange = (event) => {
    setExperienceLevel(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  const handleFilterClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const saveJob = (job) => {
    console.log('Job saved:', job);
  };

  const applyForJob = (job) => {
    console.log('Applied for job:', job);
  };

  const applyFilters = () => {
    const filtered = jobs.filter((job) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchType === 'title'
          ? job.title.toLowerCase().includes(query)
          : searchType === 'company'
          ? job.company.toLowerCase().includes(query)
          : searchType === 'location'
          ? job.location.toLowerCase().includes(query)
          : true;

      const matchesJobType = jobType ? job.type === jobType : true;
      const matchesLocation = location ? job.location === location : true;
      const matchesSalaryLevel = salaryLevel
        ? job.salary.includes(salaryLevel)
        : true;
      const matchesExperienceLevel = experienceLevel
        ? job.requirements.toLowerCase().includes(experienceLevel.toLowerCase())
        : true;
      const matchesIndustry = industry ? job.industry === industry : true;

      return (
        matchesSearch &&
        matchesJobType &&
        matchesLocation &&
        matchesSalaryLevel &&
        matchesExperienceLevel &&
        matchesIndustry
      );
    });
    setFilteredJobs(filtered);
    handleDrawerClose();
  };

  const handleCardClick = (job) => {
    navigate(`/job/${job.jobTitle}`, { state: { job } });
  };

  return (
    <Box display="flex" flexDirection="column" padding={3}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" style={{ color: '#008080' }}>
            Search Jobs
          </Typography>
          <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
            <FormControl variant="outlined" style={{ marginRight: '10px', marginLeft: '10px', flex: 1 }}>
              <TextField
                placeholder="Search by Company, or Location"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: '#fff', borderRadius: '4px' }}
              />
            </FormControl>
            <IconButton
              className="custom-button"
              color="primary"
              style={{ color: 'white', marginLeft: '10px' }}
              onClick={applyFilters}
            >
              <SearchIcon />
            </IconButton>
            <Button
              className="custom-button"
              color="primary"
              startIcon={<FilterListIcon />}
              style={{
                marginLeft: '10px',
                backgroundColor: '#008080',
                color: 'white',
                width: '200px',
              }}
              onClick={handleFilterClick}
            >
              Filter
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Grid item xs={12} md={4} key={job._id}>
                <Paper
                  className="job-card"
                  elevation={3}
                  style={{ padding: '20px', height: '100%', cursor: 'pointer' }}
                  onClick={() => handleCardClick(job)}
                >
                  <Box mb={2}>
                    <Typography variant="h6" style={{ color: 'black' }}>
                      {job.jobTitle}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    <strong>Company:</strong> {job.company}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Description:</strong> {job.description}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Salary:</strong> {job.salary}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Position:</strong> {job.position}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Location:</strong> {job.location}
                  </Typography>
                 
                  <Typography variant="body2" color="textSecondary">
                    <strong>Requirements:</strong> {job.requirements}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography>No jobs found matching your criteria.</Typography>
          )}
        </Grid>

        {/* Drawer for filters */}
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <Box className="drawer-container" padding={3} width="300px" role="presentation">
            <Typography className="drawer-title" variant="h6" gutterBottom>
              Filter Jobs
            </Typography>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '15px' }}>
              <InputLabel>Job Type</InputLabel>
              <Select value={jobType} onChange={handleJobTypeChange} label="Job Type">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="full time">Full Time</MenuItem>
                <MenuItem value="part time">Part Time</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '15px' }}>
              <InputLabel>Location</InputLabel>
              <Select value={location} onChange={handleLocationChange} label="Location">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="London, England">London, England</MenuItem>
                {/* Add more locations */}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '15px' }}>
              <InputLabel>Salary Level</InputLabel>
              <Select value={salaryLevel} onChange={handleSalaryLevelChange} label="Salary Level">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="50000-60000">£50,000 - £60,000</MenuItem>
                {/* Add more salary levels */}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '15px' }}>
              <InputLabel>Experience Level</InputLabel>
              <Select
                value={experienceLevel}
                onChange={handleExperienceLevelChange}
                label="Experience Level"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Entry Level">Entry Level</MenuItem>
                <MenuItem value="Mid Level">Mid Level</MenuItem>
                <MenuItem value="Senior Level">Senior Level</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '15px' }}>
              <InputLabel>Industry</InputLabel>
              <Select value={industry} onChange={handleIndustryChange} label="Industry">
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Software Development">Software Development</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                {/* Add more industries */}
              </Select>
            </FormControl>
            <Button
              onClick={applyFilters}
              variant="contained"
              className="apply-button"
              style={{ backgroundColor: '#008080', color: 'white', width: '100%' }}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default BrowseJob;
