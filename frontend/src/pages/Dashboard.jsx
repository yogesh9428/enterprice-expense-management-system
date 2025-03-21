import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In the future, clear auth token here
    navigate('/');
  };

  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4">Welcome to Expense Management</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Track and manage your expenses efficiently.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;