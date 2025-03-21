import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData); // Replace with API call later
    navigate('/dashboard'); // Redirect after signup (adjust later)
  };

  return (
    <Container maxWidth="sm" className="full-page-container">
      <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: 2, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Role"
            name="role"
            select
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="EMPLOYEE">Employee</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Button onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
