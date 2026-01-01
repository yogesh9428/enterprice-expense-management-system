import React from 'react';
import { Paper, Box, Typography, Stack, Grid, TextField, InputAdornment, Divider, Button } from '@mui/material';
import { PersonOutline, MailOutline, BadgeOutlined, LockOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Shared Input Styles
const inputStyles = {
  '& .MuiFilledInput-root': {
    backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid transparent', transition: 'all 0.2s',
    '&:hover': { backgroundColor: '#f1f5f9' },
    '&.Mui-focused': { backgroundColor: '#fff', border: '1px solid #6366f1', boxShadow: '0 0 0 4px rgba(99,102,241,0.1)' },
    '&:before, &:after': { display: 'none' },
    '&.Mui-disabled': { backgroundColor: '#f1f5f9', color: '#94a3b8' }
  },
  '& .MuiInputLabel-root': { color: '#94a3b8', fontWeight: 500 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
};

const ProfileForm = ({ profile, saving, error, success, handleChange, handleSave }) => {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>Account Settings</Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>Manage your personal information and security preferences.</Typography>
        </Box>

        {/* Feedback Messages */}
        {error && (
          <Box sx={{ mb: 3, p: 2, borderRadius: '16px', bgcolor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ef4444' }} /> {error}
          </Box>
        )}
        {success && (
          <Box sx={{ mb: 3, p: 2, borderRadius: '16px', bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#22c55e' }} /> {success}
          </Box>
        )}

        <Stack spacing={3}>
          <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                   <TextField label="Full Name" name="name" fullWidth value={profile.name} onChange={handleChange} sx={inputStyles} variant="filled"
                      InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: '#94a3b8' }} /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} md={6}>
                   <TextField label="Email Address" value={profile.email} fullWidth disabled sx={{ ...inputStyles, opacity: 0.8 }} variant="filled"
                      InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><MailOutline sx={{ color: '#94a3b8' }} /></InputAdornment> }} />
              </Grid>
          </Grid>

          <TextField label="Role Assignment" value={profile.role} fullWidth disabled sx={{ ...inputStyles, opacity: 0.8 }} variant="filled" helperText="Role changes require Admin approval."
              InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><BadgeOutlined sx={{ color: '#94a3b8' }} /></InputAdornment> }} />

          <Divider sx={{ my: 1, borderColor: '#f1f5f9' }} />
          
          <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>Security</Typography>
              <TextField label="New Password" name="password" type="password" fullWidth value={profile.password} onChange={handleChange} placeholder="Leave blank to keep current password" sx={inputStyles} variant="filled"
                  InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#94a3b8' }} /></InputAdornment> }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="contained" onClick={handleSave} disabled={saving} 
              sx={{ bgcolor: '#0f172a', color: '#fff', borderRadius: '16px', px: 4, py: 1.5, fontWeight: 600, textTransform: 'none', boxShadow: '0 10px 20px -5px rgba(15,23,42,0.3)', '&:hover': { bgcolor: '#1e293b', transform: 'translateY(-2px)' }, transition: 'all 0.2s' }}>
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
};

export default ProfileForm;