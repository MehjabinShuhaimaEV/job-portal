import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fetch all jobs
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/jobs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Handle user login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Fetch all user applications (admin access only)
export const fetchAllApplications = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/user-applications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

// Fetch a specific application by ID (admin access only)
export const fetchApplicationDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/admin/user-applications/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching application details:', error);
    throw error;
  }
};

// Update application status and comments (admin access only)
export const updateApplication = async (id, status, comments) => {
  try {
    const response = await axios.put(`${API_URL}/api/admin/user-applications/${id}`, {
      status,
      comments
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};
