import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to Expense Management System
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Track, manage, and analyze your expenses efficiently.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mr: 2 }} 
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
