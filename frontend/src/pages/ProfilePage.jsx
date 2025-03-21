import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Employee',
    password: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Profile Updated:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>Profile</Typography>
        
        <TextField label="Full Name" name="name" fullWidth margin="normal" value={profile.name} onChange={handleChange} />
        <TextField label="Email" name="email" fullWidth margin="normal" value={profile.email} disabled />
        <TextField label="Role" name="role" fullWidth margin="normal" value={profile.role} disabled />

        <Typography variant="h6" sx={{ mt: 3 }}>Change Password</Typography>
        <TextField label="New Password" name="password" type="password" fullWidth margin="normal" value={profile.password} onChange={handleChange} />

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
