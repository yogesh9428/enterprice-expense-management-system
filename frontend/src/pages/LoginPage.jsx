import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment, Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff, ArrowBackIosNew, MailOutline, LockOutlined, BoltRounded, Fingerprint, ShieldMoonRounded } from "@mui/icons-material";
import axios from "axios";

// --- 🔧 ANIMATION VARIANTS ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

const LoginPage = () => {
  // --- 🧠 ORIGINAL LOGIC (UNCHANGED) ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call backend login endpoint
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });

      // Extract token from backend response
      const { token, tokenType } = response.data;
      if (!token) throw new Error("No token received from server");

      // Save JWT in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("tokenType", tokenType || "Bearer");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      // Show backend error if available, fallback to generic
      setError(err.response?.data || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // --- END LOGIC ---

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* 1. Background Atmosphere (Matches Homepage) */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(30px, 50px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={8} alignItems="center">
          
          {/* --- LEFT SIDE: LOGIN FORM --- */}
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
                sx={{ 
                  p: { xs: 3, md: 0 }, 
                  bgcolor: 'transparent' 
                }}
              >
                {/* Badge */}
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, mb: 3, borderRadius: '100px', bgcolor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                    <BoltRounded sx={{ fontSize: 14, color: '#f59e0b' }} />
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', letterSpacing: '0.05em' }}>
                      SECURE GATEWAY
                    </Typography>
                  </Box>
                </motion.div>

                {/* Header */}
                <motion.div variants={itemVariants}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, letterSpacing: '-0.02em' }}>
                    Welcome back.
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b', mb: 4, fontSize: '1.1rem' }}>
                    Please enter your details to access the dashboard.
                  </Typography>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Box sx={{ mb: 3, p: 2, borderRadius: 3, bgcolor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ef4444' }} />
                      <Typography sx={{ color: '#b91c1c', fontSize: '0.875rem', fontWeight: 500 }}>{error}</Typography>
                    </Box>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin}>
                  <Stack spacing={3}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                          startAdornment: <InputAdornment position="start"><MailOutline sx={{ color: '#94a3b8' }} /></InputAdornment>,
                        }}
                        sx={inputStyles}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                        variant="filled"
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
                        sx={inputStyles}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
                        <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                          Forgot Password?
                        </Typography>
                      </Box>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                          py: 2,
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
                        {loading ? "Authenticating..." : "Sign In"}
                      </Button>
                    </motion.div>
                  </Stack>
                </form>

                <motion.div variants={itemVariants}>
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Don't have an account? 
                      <Typography
                        component="span"
                        sx={{ ml: 0.5, color: '#0f172a', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        onClick={() => navigate('/signup')}
                      >
                        Request Access
                      </Typography>
                    </Typography>
                  </Box>
                </motion.div>

              </Paper>
            </motion.div>
          </Grid>

          {/* --- RIGHT SIDE: 3D VISUALS (Matching Homepage Style) --- */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, perspective: '1500px' }}>
             <motion.div
               initial={{ opacity: 0, rotateY: 20, x: 50 }}
               animate={{ opacity: 1, rotateY: -10, x: 0 }}
               transition={{ duration: 1.2, ease: "easeOut" }}
             >
                <Box sx={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  
                  {/* Glass Card - Login Visual */}
                  <Box sx={{ 
                    position: 'relative', 
                    width: '400px', 
                    height: '500px', 
                    borderRadius: '40px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4
                  }}>
                    {/* Decorative Circle */}
                    <Box sx={{ 
                      width: 120, height: 120, borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mb: 4, boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.5)'
                    }}>
                      <Fingerprint sx={{ fontSize: 60, color: '#6366f1', opacity: 0.8 }} />
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                      Biometric Security
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', mb: 4 }}>
                      Enterprise grade encryption ensures your data remains safe and private.
                    </Typography>

                    {/* Animated "Status" Bar */}
                    <Box sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.5)', borderRadius: '12px', p: 2 }}>
                       <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                          <ShieldMoonRounded sx={{ fontSize: 20, color: '#10b981' }} />
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155' }}>SYSTEM STATUS</Typography>
                       </Stack>
                       <Stack direction="row" spacing={0.5}>
                          {[1,2,3,4,5].map((i) => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              style={{ height: 4, flex: 1, background: '#10b981', borderRadius: 2 }}
                            />
                          ))}
                       </Stack>
                    </Box>
                  </Box>

                  {/* Floating Orb behind */}
                  <motion.div 
                    animate={{ y: [0, -30, 0] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: '10%', right: '10%', zIndex: -1 }}
                  >
                    <Box sx={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', opacity: 0.2, filter: 'blur(20px)' }} />
                  </motion.div>

                </Box>
             </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

// --- STYLES ---
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
    '&:before, &:after': { display: 'none' } // Hides default MUI underline
  },
  '& .MuiInputLabel-root': { color: '#94a3b8', fontWeight: 500 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
};

export default LoginPage;