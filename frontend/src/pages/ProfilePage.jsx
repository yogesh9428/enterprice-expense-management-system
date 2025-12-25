import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Stack, Avatar, IconButton, InputAdornment, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  CameraAltRounded, 
  PersonOutline, 
  MailOutline, 
  BadgeOutlined, 
  LockOutlined, 
  SaveRounded, 
  SecurityRounded,
  ShieldRounded 
} from '@mui/icons-material';

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
    // API logic would go here
    console.log('Profile Updated:', profile);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* --- 1. AURORA BACKGROUND --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-20%', right: '30%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          <Grid container spacing={4}>
            {/* --- LEFT: IDENTITY CARD --- */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: 4, borderRadius: '24px', bgcolor: '#fff', border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden'
              }}>
                {/* Decorative BG in card */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)', zIndex: 0 }} />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 100, height: 100, border: '4px solid #fff', 
                        bgcolor: '#0f172a', fontSize: '2rem', fontWeight: 700,
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }}
                    >
                      {profile.name.charAt(0)}
                    </Avatar>
                    <IconButton 
                      sx={{ 
                        position: 'absolute', bottom: 0, right: 0, bgcolor: '#6366f1', color: '#fff',
                        width: 32, height: 32, '&:hover': { bgcolor: '#4f46e5' }, border: '2px solid #fff' 
                      }}
                    >
                      <CameraAltRounded sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>{profile.name}</Typography>
                  <ChipRole role={profile.role} />
                  
                  <Box sx={{ mt: 4, p: 2, bgcolor: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                       <ShieldRounded sx={{ fontSize: 16, color: '#10b981' }} />
                       <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>SECURITY STATUS</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>Strong & Verified</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* --- RIGHT: SETTINGS FORM --- */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ 
                p: { xs: 3, md: 5 }, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.8)', 
                backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)'
              }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>Account Settings</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>Manage your personal information.</Typography>
                </Box>

                <Stack spacing={3}>
                  <TextField 
                    label="Full Name" name="name" fullWidth value={profile.name} onChange={handleChange} 
                    sx={modernInputStyles}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                  />
                  
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                    <TextField 
                      label="Email Address" name="email" fullWidth value={profile.email} disabled 
                      sx={{ ...modernInputStyles, '& .MuiFilledInput-root': { bgcolor: '#f1f5f9' } }}
                      InputProps={{ 
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><MailOutline sx={{ color: '#94a3b8' }} /></InputAdornment>,
                        endAdornment: <InputAdornment position="end"><LockOutlined sx={{ fontSize: 16, color: '#cbd5e1' }} /></InputAdornment>
                      }}
                      variant="filled"
                    />
                    <TextField 
                      label="Current Role" name="role" fullWidth value={profile.role} disabled 
                      sx={{ ...modernInputStyles, '& .MuiFilledInput-root': { bgcolor: '#f1f5f9' } }}
                      InputProps={{ 
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><BadgeOutlined sx={{ color: '#94a3b8' }} /></InputAdornment>,
                        endAdornment: <InputAdornment position="end"><LockOutlined sx={{ fontSize: 16, color: '#cbd5e1' }} /></InputAdornment>
                      }}
                      variant="filled"
                    />
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                       <SecurityRounded sx={{ color: '#6366f1' }} /> Security
                    </Typography>
                    <TextField 
                      label="New Password" name="password" type="password" fullWidth value={profile.password} onChange={handleChange} 
                      placeholder="Leave blank to keep current password"
                      sx={modernInputStyles}
                      InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={handleSave}
                      startIcon={<SaveRounded />}
                      sx={{ 
                        bgcolor: '#0f172a', color: '#fff', borderRadius: '12px', px: 4, py: 1.5, 
                        fontWeight: 600, textTransform: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        '&:hover': { bgcolor: '#1e293b', transform: 'translateY(-2px)' }, transition: 'all 0.2s'
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

        </motion.div>
      </Container>
    </Box>
  );
};

// --- SUB-COMPONENTS ---
const ChipRole = ({ role }) => (
  <Box sx={{ 
    display: 'inline-block', mt: 1, px: 2, py: 0.5, borderRadius: '100px', 
    bgcolor: '#f1f5f9', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' 
  }}>
    {role}
  </Box>
);

const modernInputStyles = {
  '& .MuiOutlinedInput-root': { 
    borderRadius: '12px', bgcolor: '#fff', 
    '& fieldset': { borderColor: '#e2e8f0' }, 
    '&:hover fieldset': { borderColor: '#cbd5e1' }, 
    '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: '2px' } 
  },
  '& .MuiFilledInput-root': {
    borderRadius: '12px', border: '1px solid transparent',
    '&:before, &:after': { display: 'none' }
  }
};

export default ProfilePage;