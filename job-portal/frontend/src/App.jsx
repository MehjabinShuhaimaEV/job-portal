import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import LoginPage from './pages/loginpage/Loginpage';
import SignupPage from './pages/signup/SignupPage';
import AdminDashboard from './pages/admindashboard/AdminDashboard';
import ManageJobsPage from './pages/admindashboard/ManageJobsPage';
import JobFormPage from './pages/admindashboard/JobFormPage'; // Import the new page component
import ViewUserApplicationsPage from './pages/admindashboard/ViewUserApplicationsPage';
import ManageApplicationsPage from './pages/admindashboard/ManageApplicationsPage'; // Import ManageApplicationsPage
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/userdashboard/UserDashboard';
import AppliedJobsPage from './pages/userdashboard/AppliedJobsPage';
import BrowseJobsPage from './pages/userdashboard/BrowserJobsPage';
import UpdateProfile from './pages/userdashboard/Updateprofile';
import JobDetailPage from './pages/userdashboard/JobDetailPage';
import Save from './pages/userdashboard/Save';
import ForgotPasswordPage from './components/ForgotPasswordPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/forget-password' element={<ForgotPasswordPage />}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/not-authorized" element={<NotAuthorizedPage />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-jobs" element={<ManageJobsPage />} />
        <Route path="manage-jobs/form" element={<JobFormPage />} /> {/* Add this route */}
        <Route path="view-applications" element={<ViewUserApplicationsPage />} />
        <Route path="application/:id" element={<ManageApplicationsPage />} /> {/* Update route for ManageApplicationsPage */}
      </Route>

      {/* User Routes */}
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<BrowseJobsPage />} /> {/* Default route for /dashboard */}
        <Route path="browse-jobs" element={<BrowseJobsPage />} />
        <Route path="applied-jobs" element={<AppliedJobsPage />} />
        <Route path="updateprofile" element={<UpdateProfile />} />
        <Route path="savejobs" element={<Save />} />
      </Route>
      <Route path="/job/:title" element={<JobDetailPage />} />
    </Routes>
  );
};

export default App;
