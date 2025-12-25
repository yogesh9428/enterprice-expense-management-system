import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, IconButton, InputAdornment, Grid, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBackIosNew, PersonOutline, MailOutline, LockOutlined, BadgeOutlined, StarRounded } from '@mui/icons-material';

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#ffffff',
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* --- 1. SUPERIOR AURORA BACKGROUND (Matching Home Page) --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-25%', right: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          
          {/* --- LEFT SIDE: The Form --- */}
          <Grid item xs={12} md={6} lg={5}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: '32px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
                  position: 'relative'
                }}
              >
                {/* Back Button */}
                <IconButton 
                  onClick={() => navigate('/')} 
                  sx={{ 
                    position: 'absolute', top: 24, left: 24, 
                    color: '#64748b', bgcolor: '#f1f5f9', 
                    '&:hover': { bgcolor: '#e2e8f0' } 
                  }}
                >
                  <ArrowBackIosNew sx={{ fontSize: 16 }} />
                </IconButton>

                <Box sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, letterSpacing: '-0.02em' }}>
                    Create Account
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    Join the fastest growing finance platform.
                  </Typography>
                </Box>

                <form onSubmit={handleSignup}>
                  <Stack spacing={2.5}>
                    <TextField
                      label="Full Name"
                      name="name"
                      variant="filled"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleChange}
                      sx={modernInputStyles}
                      InputProps={{ 
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: '#94a3b8' }} /></InputAdornment>
                      }}
                    />
                    <TextField
                      label="Email Address"
                      name="email"
                      type="email"
                      variant="filled"
                      fullWidth
                      required
                      value={formData.email}
                      onChange={handleChange}
                      sx={modernInputStyles}
                      InputProps={{ 
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><MailOutline sx={{ color: '#94a3b8' }} /></InputAdornment>
                      }}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      variant="filled"
                      fullWidth
                      required
                      value={formData.password}
                      onChange={handleChange}
                      sx={modernInputStyles}
                      InputProps={{ 
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#94a3b8' }} /></InputAdornment>
                      }}
                    />
                    <TextField
                      label="Role"
                      name="role"
                      select
                      variant="filled"
                      fullWidth
                      value={formData.role}
                      onChange={handleChange}
                      sx={modernInputStyles}
                      InputProps={{ 
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><BadgeOutlined sx={{ color: '#94a3b8' }} /></InputAdornment>
                      }}
                    >
                      <MenuItem value="EMPLOYEE">Employee</MenuItem>
                      <MenuItem value="MANAGER">Manager</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                    </TextField>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.8,
                        borderRadius: '16px',
                        bgcolor: '#0f172a',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.4)',
                        '&:hover': { bgcolor: '#1e293b', transform: 'translateY(-1px)' },
                        '&:disabled': { bgcolor: '#cbd5e1' },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {loading ? 'Creating...' : 'Create Account'}
                    </Button>
                  </Stack>
                </form>

                <Typography sx={{ mt: 4, textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                  Already have an account?{' '}
                  <span 
                    onClick={() => navigate('/login')} 
                    style={{ color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Log in
                  </span>
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* --- RIGHT SIDE: Visual Candy (Hidden on Mobile) --- */}
          <Grid item md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' }, pl: { md: 8 } }}>
             <motion.div
               initial={{ opacity: 0, x: 40 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <Box sx={{ position: 'relative' }}>
                   {/* Abstract 3D Shape or Testimonial */}
                   <Paper 
                     sx={{ 
                       p: 4, borderRadius: '32px', bgcolor: 'rgba(255,255,255,0.6)', 
                       backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.8)',
                       boxShadow: '0 40px 80px -20px rgba(0,0,0,0.05)' 
                     }}
                   >
                      <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mb: 2, lineHeight: 1.1 }}>
                        Manage expenses <br/> 
                        <span style={{ color: '#6366f1' }}>without the chaos.</span>
                      </Typography>
                      <Typography sx={{ color: '#64748b', fontSize: '1.1rem', mb: 4, lineHeight: 1.6 }}>
                        "This platform completely transformed how we handle team spending. It's fast, beautiful, and secure."
                      </Typography>
                      
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: '#0f172a' }} />
                        <Box>
                          <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>Jadav Yogesh</Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>CEO at Expense</Typography>
                        </Box>
                        <Stack direction="row" sx={{ color: '#f59e0b', ml: 'auto !important' }}>
                          {[1,2,3,4,5].map(s => <StarRounded key={s} fontSize="small" />)}
                        </Stack>
                      </Stack>
                   </Paper>
                   
                   {/* Floating Blur Behind */}
                   <Box sx={{ position: 'absolute', top: '50%', right: '-20%', width: '300px', height: '300px', bgcolor: 'rgba(99,102,241,0.2)', filter: 'blur(100px)', zIndex: -1 }} />
                </Box>
             </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

// Refined Input Styles for "Superior" look
const modernInputStyles = {
  '& .MuiFilledInput-root': {
    backgroundColor: '#f1f5f9', // Slate-100
    borderRadius: '16px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#e2e8f0' }, // Slate-200
    '&.Mui-focused': {
      backgroundColor: '#fff',
      border: '1px solid #6366f1', // Indigo Border on focus
      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)', // Indigo Ring
    }
  },
  '& .MuiInputLabel-root': { color: '#64748b', ml: 4 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1', ml: 0 }, // Indigo Label
};

export default SignupPage;