import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, IconButton, InputAdornment, Grid, Paper, Stack, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBackIosNew, PersonOutline, MailOutline, LockOutlined, BadgeOutlined, Visibility, VisibilityOff, PublicRounded, RocketLaunchRounded } from '@mui/icons-material';
import axios from 'axios';

// --- 🔧 ANIMATION VARIANTS (Matching Login Page) ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added missing state
  const [error, setError] = useState("");
  
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
    setError("");

    try {
      await axios.post("http://localhost:8080/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" }
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#ffffff', // Changed to match Login pure white base
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Background Atmosphere (Identical to Login) */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-20%', right: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={8} alignItems="center" justifyContent="center">

          {/* --- LEFT: SIGNUP FORM --- */}
          <Grid item xs={12} md={6}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              
              {/* Back Button */}
              <motion.div variants={itemVariants}>
                 <Button 
                   startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />} 
                   onClick={() => navigate('/')}
                   sx={{ color: '#64748b', textTransform: 'none', mb: 4, '&:hover': { bgcolor: '#f1f5f9' } }}
                 >
                   Back to Home
                 </Button>
              </motion.div>

              <Paper 
                elevation={0}
                sx={{ bgcolor: 'transparent', p: { xs: 2, md: 0 } }}
              >
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, mb: 3, borderRadius: '100px', bgcolor: '#f0f9ff', border: '1px solid #e0f2fe' }}>
                    <RocketLaunchRounded sx={{ fontSize: 14, color: '#0ea5e9' }} />
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369a1', letterSpacing: '0.05em' }}>
                      START YOUR JOURNEY
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, letterSpacing: '-0.02em' }}>
                    Create Account
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b', mb: 4, fontSize: '1.1rem' }}>
                    Join the operating system for modern finance.
                  </Typography>
                </motion.div>

                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Box sx={{ mb: 3, p: 2, borderRadius: 3, bgcolor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ef4444' }} />
                      <Typography sx={{ color: '#b91c1c', fontSize: '0.875rem', fontWeight: 500 }}>{error}</Typography>
                    </Box>
                  </motion.div>
                )}

                <form onSubmit={handleSignup}>
                  <Stack spacing={2.5}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        label="Full Name"
                        name="name"
                        variant="filled"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={handleChange}
                        sx={inputStyles}
                        InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        variant="filled"
                        fullWidth
                        required
                        value={formData.email}
                        onChange={handleChange}
                        sx={inputStyles}
                        InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><MailOutline sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        fullWidth
                        required
                        value={formData.password}
                        onChange={handleChange}
                        sx={inputStyles}
                        InputProps={{ 
                          disableUnderline: true, 
                          startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#94a3b8' }} /></InputAdornment>,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff sx={{ color: '#94a3b8' }} /> : <Visibility sx={{ color: '#94a3b8' }} />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <TextField
                        label="Role"
                        name="role"
                        select
                        variant="filled"
                        fullWidth
                        value={formData.role}
                        onChange={handleChange}
                        sx={inputStyles}
                        InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><BadgeOutlined sx={{ color: '#94a3b8' }} /></InputAdornment> }}
                      >
                        <MenuItem value="EMPLOYEE">Employee</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                      </TextField>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                          py: 2,
                          mt: 1,
                          borderRadius: '16px',
                          bgcolor: '#0f172a',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: '1rem',
                          textTransform: 'none',
                          boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.3)',
                          '&:hover': { bgcolor: '#1e293b', transform: 'translateY(-2px)' },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </motion.div>
                  </Stack>
                </form>

                <motion.div variants={itemVariants}>
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Already have an account?{' '}
                      <Typography component="span" onClick={() => navigate('/login')} sx={{ color: '#0f172a', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        Log in
                      </Typography>
                    </Typography>
                  </Box>
                </motion.div>
              </Paper>
            </motion.div>
          </Grid>

          {/* --- RIGHT: 3D GLOBAL CARD (Matches Login Style) --- */}
          <Grid item md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' }, perspective: '1500px' }}>
            <motion.div 
              initial={{ opacity: 0, rotateY: -20, x: 40 }} 
              animate={{ opacity: 1, rotateY: 10, x: 0 }} 
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Box sx={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Glass Card */}
                <Box sx={{ 
                    position: 'relative', width: '400px', height: '520px', borderRadius: '40px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                    backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4
                }}>
                  
                  {/* Icon */}
                  <Box sx={{ 
                    width: 100, height: 100, borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mb: 4, boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5)'
                  }}>
                    <PublicRounded sx={{ fontSize: 50, color: '#3b82f6', opacity: 0.8 }} />
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                    Join the Global Team
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', mb: 6 }}>
                    Connect with over 10,000 finance teams managing spend across 120+ countries.
                  </Typography>

                  {/* Floating Avatars Animation */}
                  <Box sx={{ position: 'relative', width: '100%', height: '80px' }}>
                     {[1,2,3].map((i) => (
                        <motion.div 
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                          style={{ position: 'absolute', left: `${25 + (i*20)}%`, top: 0 }}
                        >
                           <Avatar sx={{ width: 48, height: 48, border: '3px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                        </motion.div>
                     ))}
                  </Box>

                </Box>

                {/* Floating Decoration */}
                <motion.div 
                  animate={{ y: [0, 30, 0] }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: -1 }}
                >
                  <Box sx={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', opacity: 0.15, filter: 'blur(25px)' }} />
                </motion.div>

              </Box>
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

// --- STYLES (Exact match to Login Page for consistency) ---
const inputStyles = {
  '& .MuiFilledInput-root': {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    border: '1px solid transparent',
    transition: 'all 0.2s',
    '&:hover': { backgroundColor: '#f1f5f9' },
    '&.Mui-focused': { 
      backgroundColor: '#fff', 
      border: '1px solid #6366f1', 
      boxShadow: '0 0 0 4px rgba(99,102,241,0.1)' 
    },
    '&:before, &:after': { display: 'none' }
  },
  '& .MuiInputLabel-root': { color: '#94a3b8', fontWeight: 500 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
};

export default SignupPage;