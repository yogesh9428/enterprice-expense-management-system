import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment, Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff, ArrowBackIosNew, MailOutline, LockOutlined, ShieldOutlined, Fingerprint } from "@mui/icons-material";
import axios from "axios";

const LoginPage = () => {
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
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      localStorage.setItem("token", response.data);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
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
      {/* --- 1. SUPERIOR AURORA BACKGROUND --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-25%', left: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          
          {/* --- LEFT SIDE: The Login Form --- */}
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
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    Access your enterprise dashboard.
                  </Typography>
                </Box>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <Box sx={{ mb: 3, p: 1.5, borderRadius: '12px', bgcolor: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ color: '#b91c1c', fontSize: '0.9rem', fontWeight: 500 }}>{error}</Typography>
                    </Box>
                  </motion.div>
                )}

                <form onSubmit={handleLogin}>
                  <Stack spacing={2.5}>
                    <TextField
                      label="Email Address"
                      variant="filled"
                      fullWidth
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={modernInputStyles}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><MailOutline sx={{ color: '#94a3b8' }} /></InputAdornment>,
                      }}
                    />
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      variant="filled"
                      fullWidth
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={modernInputStyles}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#94a3b8' }} /></InputAdornment>,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94a3b8' }}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

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
                      {loading ? 'Authenticating...' : 'Sign In'}
                    </Button>
                  </Stack>
                </form>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>New here?</Typography>
                  <Typography
                    onClick={() => navigate('/signup')}
                    sx={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Create an account
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* --- RIGHT SIDE: Security Visualization (Hidden on Mobile) --- */}
          <Grid item md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' }, pl: { md: 8 } }}>
             <motion.div
               initial={{ opacity: 0, x: 40 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <Box sx={{ position: 'relative' }}>
                   {/* Glass Card */}
                   <Paper 
                     sx={{ 
                       p: 4, borderRadius: '32px', bgcolor: 'rgba(255,255,255,0.6)', 
                       backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.8)',
                       boxShadow: '0 40px 80px -20px rgba(0,0,0,0.05)',
                       maxWidth: '450px',
                       mx: 'auto'
                     }}
                   >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <ShieldOutlined sx={{ color: '#4338ca', fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Enterprise Grade</Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>Bank-level security</Typography>
                        </Box>
                      </Box>
                      
                      <Typography sx={{ color: '#64748b', fontSize: '1.05rem', mb: 4, lineHeight: 1.6 }}>
                        "Securely manage your organization's expenses with multi-factor authentication and real-time fraud detection."
                      </Typography>
                      
                      {/* Mock Biometric Scan Visual */}
                      <Box sx={{ 
                        height: '60px', borderRadius: '16px', bgcolor: '#f8fafc', 
                        display: 'flex', alignItems: 'center', px: 2, gap: 2,
                        border: '1px solid #e2e8f0'
                      }}>
                         <Fingerprint sx={{ color: '#10b981' }} />
                         <Typography sx={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>
                           Biometric verification ready
                         </Typography>
                         <Box sx={{ ml: 'auto', px: 1.5, py: 0.5, bgcolor: '#dcfce7', borderRadius: '8px', color: '#15803d', fontSize: '0.75rem', fontWeight: 700 }}>
                           ACTIVE
                         </Box>
                      </Box>
                   </Paper>
                   
                   {/* Background Glow */}
                   <Box sx={{ position: 'absolute', top: '50%', right: '-10%', width: '250px', height: '250px', bgcolor: 'rgba(236, 72, 153, 0.2)', filter: 'blur(90px)', zIndex: -1 }} />
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
    backgroundColor: '#f1f5f9',
    borderRadius: '16px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#e2e8f0' },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      border: '1px solid #6366f1',
      boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.1)',
    }
  },
  '& .MuiInputLabel-root': { color: '#64748b', ml: 4 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1', ml: 0 },
};

export default LoginPage;