import React from 'react';
import { Container, Typography, Button, Box, Stack, Grid, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BoltRounded, ArrowForwardRounded, StarRounded, CheckCircleRounded, TrendingUpRounded, SecurityRounded } from '@mui/icons-material';

// --- 🔧 DYNAMIC CONFIGURATION ---
const pageConfig = {
  hero: {
    badge: "ENTERPRISE SYSTEM V2.0",
    titleLine1: "Orchestrate your",
    titleLine2: "global spend.",
    description: "The complete operating system for corporate finance. Automate expense reporting, enforce real-time compliance, and unlock AI-driven audit trails.",
    primaryBtn: "Request Demo",
    secondaryBtn: "System Login"
  },
  video: {
    // New Video: Abstract Blue/White Network Connections (implies speed & global scale)
    url: "https://assets.mixkit.co/videos/preview/mixkit-network-connection-background-3098-large.mp4" 
  },
  stats: {
    revenue: "$2.4M",
    savings: "+ 18.5%"
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Parallax Animations
  const yRight = useTransform(scrollY, [0, 500], [0, -40]);
  const rotateRight = useTransform(scrollY, [0, 500], [0, 3]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#ffffff', 
        color: '#0f172a', 
        overflowX: 'hidden', 
        fontFamily: '"Inter", sans-serif',
        position: 'relative'
      }}
    >
      
      {/* 1. Background Atmosphere */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-30%', left: '-10%', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', top: '20%', right: '-20%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 60%)', animation: 'float 30s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(30px, 50px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 12, md: 12 }, pb: 10 }}>
        <Grid container spacing={8} alignItems="center">
          
          {/* --- LEFT SIDE: THE PITCH --- */}
          <Grid item xs={12} md={6}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.8, mb: 4, 
                  borderRadius: '100px', bgcolor: '#fff', border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
                }}>
                  <BoltRounded sx={{ fontSize: 16, color: '#f59e0b' }} />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', letterSpacing: '0.08em' }}>
                    {pageConfig.hero.badge}
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3rem', md: '4.5rem' }, lineHeight: 0.95, letterSpacing: '-0.04em', mb: 3, color: '#0f172a' }}>
                  {pageConfig.hero.titleLine1} <br/>
                  <Box component="span" sx={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {pageConfig.hero.titleLine2}
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography sx={{ fontSize: '1.15rem', color: '#64748b', mb: 5, maxWidth: '520px', lineHeight: 1.6, fontWeight: 400 }}>
                   {pageConfig.hero.description}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" size="large" onClick={() => navigate('/signup')} endIcon={<ArrowForwardRounded />}
                    sx={{ 
                      bgcolor: '#0f172a', color: '#fff', borderRadius: '12px', px: 4, py: 1.8, 
                      fontSize: '1rem', fontWeight: 600, textTransform: 'none', 
                      boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)', 
                      '&:hover': { transform: 'translateY(-2px)', bgcolor: '#1e293b', boxShadow: '0 30px 60px -12px rgba(15, 23, 42, 0.5)' },
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}
                  >
                    {pageConfig.hero.primaryBtn}
                  </Button>
                  <Button 
                    variant="outlined" size="large" onClick={() => navigate('/login')}
                    sx={{ 
                      color: '#0f172a', borderColor: '#e2e8f0', borderRadius: '12px', px: 4, py: 1.8, 
                      fontSize: '1rem', fontWeight: 600, textTransform: 'none', bgcolor: '#fff',
                      '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1', transform: 'translateY(-2px)' },
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    }}
                  >
                    {pageConfig.hero.secondaryBtn}
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 8, opacity: 0.8 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>TRUSTED BY FINANCE TEAMS AT</Typography>
                  <Stack direction="row" spacing={-1}>
                     <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#cbd5e1' }} />
                     <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#94a3b8' }} />
                     <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#64748b' }} />
                  </Stack>
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>

          {/* --- RIGHT SIDE: THE COMMAND CENTER PORTAL --- */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, perspective: '2000px' }}>
            <motion.div
              style={{ y: yRight, rotateY: -5, rotateX: rotateRight }}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: -12 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: '650px' }}>
                
                {/* Glass Container */}
                <Box sx={{ 
                  position: 'relative', width: '100%', height: '100%', borderRadius: '40px', overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', 
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 60px 120px -20px rgba(15, 23, 42, 0.25), inset 0 0 0 2px rgba(255,255,255,0.5)'
                }}>
                  {/* Dynamic Video Background */}
                  <video 
                    autoPlay loop muted playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'multiply', filter: 'contrast(1.1)' }}
                  >
                    <source src={pageConfig.video.url} type="video/mp4" />
                  </video>

                  {/* UI Overlay (The "App" Interface) */}
                  <Box sx={{ position: 'absolute', inset: 0, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Fake Nav */}
                    <Box sx={{ width: '100%', p: 2.5, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                       <Box sx={{ display: 'flex', gap: 1.5 }}><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} /><Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} /></Box>
                       <Box sx={{ width: 120, height: 6, bgcolor: '#f1f5f9', borderRadius: 4 }} />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
                       {/* Sidebar Mockup */}
                       <Box sx={{ width: '80px', height: '100%', bgcolor: 'rgba(255,255,255,0.7)', borderRadius: '24px', backdropFilter: 'blur(10px)' }} />
                       
                       {/* Main Dashboard Mockup */}
                       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {/* Hero Card inside the UI */}
                          <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.95)', borderRadius: '32px', p: 4, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                             <Stack direction="row" justifyContent="space-between">
                               <Box>
                                 <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '1px' }}>Q3 REVENUE</Typography>
                                 <Typography variant="h3" sx={{ color: '#0f172a', fontWeight: 800, letterSpacing: '-1px' }}>{pageConfig.stats.revenue}</Typography>
                               </Box>
                               <Box sx={{ width: 40, height: 40, bgcolor: '#f1f5f9', borderRadius: '12px' }} />
                             </Stack>
                             
                             {/* Abstract Graph Lines */}
                             <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px', background: 'linear-gradient(180deg, rgba(99,102,241,0.15) 0%, transparent 100%)', clipPath: 'polygon(0 100%, 0 40%, 20% 60%, 40% 30%, 60% 50%, 80% 20%, 100% 40%, 100% 100%)' }} />
                             <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px', borderTop: '4px solid #6366f1', clipPath: 'polygon(0 100%, 0 40%, 20% 60%, 40% 30%, 60% 50%, 80% 20%, 100% 40%, 100% 100%)' }} />
                          </Box>
                          
                          {/* Lower Cards */}
                          <Box sx={{ display: 'flex', gap: 2, height: '140px' }}>
                             <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: '24px' }} />
                             <Box sx={{ flex: 1, bgcolor: '#0f172a', borderRadius: '24px', opacity: 0.9 }} />
                          </Box>
                       </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Floating Widgets (Orbiting Elements) */}
                <motion.div animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '20%', right: '-50px', zIndex: 10 }}>
                   <Paper sx={{ p: 2.5, borderRadius: '24px', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 30px 60px rgba(0,0,0,0.15)', backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.95)' }}>
                      <Box sx={{ width: 50, height: 50, bgcolor: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircleRounded sx={{ color: '#166534', fontSize: 28 }} /></Box>
                      <Box>
                         <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>APPROVALS</Typography>
                         <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>All Clear</Typography>
                      </Box>
                   </Paper>
                </motion.div>

                <motion.div animate={{ y: [0, 20, 0], rotate: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ position: 'absolute', bottom: '25%', left: '-60px', zIndex: 10 }}>
                   <Paper sx={{ p: 2.5, borderRadius: '24px', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 30px 60px rgba(0,0,0,0.15)', backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.95)' }}>
                      <Box sx={{ width: 50, height: 50, bgcolor: '#e0e7ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SecurityRounded sx={{ color: '#4338ca', fontSize: 26 }} /></Box>
                      <Box>
                         <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>SECURITY</Typography>
                         <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>Encrypted</Typography>
                      </Box>
                   </Paper>
                </motion.div>

              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;