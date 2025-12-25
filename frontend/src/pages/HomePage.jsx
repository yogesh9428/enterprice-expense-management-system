import React from 'react';
import { Container, Typography, Button, Box, Stack, Grid, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BoltRounded, ArrowForwardRounded, StarRounded, CheckCircleRounded, TrendingUpRounded } from '@mui/icons-material';

// --- 🔧 DYNAMIC CONFIGURATION (Edit this!) ---
const pageConfig = {
  hero: {
    badge: "ENTERPRISE V1.0",
    titleLine1: "Spend smarter,",
    titleLine2: "scale faster.", // This part gets the gradient color
    description: "The all-in-one platform for automated approvals, real-time analytics, and enterprise-grade security.",
    primaryBtn: "Start Free Trial",
    secondaryBtn: "Log In"
  },
  video: {
    // You can paste ANY video URL here (mp4/webm)
    url: "https://assets.mixkit.co/videos/preview/mixkit-white-abstract-technology-network-1936-large.mp4" 
  },
  stats: {
    revenue: "$124,500",
    savings: "+ 24.5%"
  }
};
// ----------------------------------------------

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const yRight = useTransform(scrollY, [0, 500], [0, -50]);
  const rotateRight = useTransform(scrollY, [0, 500], [0, 5]);

  // Animation Variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', color: '#0f172a', overflow: 'hidden', fontFamily: '"Inter", sans-serif' }}>
      
      {/* 1. Background (Same optimized Aurora) */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-25%', left: '-10%', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', top: '15%', right: '-15%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 12 } }}>
        <Grid container spacing={8} alignItems="center">
          
          {/* --- LEFT SIDE (Dynamic Content) --- */}
          <Grid item xs={12} md={6}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.8, mb: 4, borderRadius: '100px', bgcolor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                  <BoltRounded sx={{ fontSize: 16, color: '#f59e0b' }} />
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', letterSpacing: '0.05em' }}>
                    {pageConfig.hero.badge}
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3rem', md: '4.8rem' }, lineHeight: 1, letterSpacing: '-0.04em', mb: 3, color: '#0f172a' }}>
                  {pageConfig.hero.titleLine1} <br/>
                  <Box component="span" sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {pageConfig.hero.titleLine2}
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography sx={{ fontSize: '1.2rem', color: '#64748b', mb: 5, maxWidth: '480px', lineHeight: 1.6 }}>
                   {pageConfig.hero.description}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" size="large" onClick={() => navigate('/signup')} endIcon={<ArrowForwardRounded />}
                    sx={{ bgcolor: '#0f172a', color: '#fff', borderRadius: '14px', px: 4, py: 1.8, fontSize: '1rem', fontWeight: 600, textTransform: 'none', boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)', '&:hover': { transform: 'scale(1.02)', bgcolor: '#1e293b' } }}
                  >
                    {pageConfig.hero.primaryBtn}
                  </Button>
                  <Button 
                    variant="text" size="large" onClick={() => navigate('/login')}
                    sx={{ color: '#0f172a', borderRadius: '14px', px: 4, py: 1.8, fontSize: '1rem', fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#f8fafc' } }}
                  >
                    {pageConfig.hero.secondaryBtn}
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 6 }}>
                  <Stack direction="row" spacing={-1}>
                     {[1, 2, 3].map((i) => <Avatar key={i} sx={{ width: 36, height: 36, border: '2px solid #fff', bgcolor: '#cbd5e1' }} />)}
                  </Stack>
                  <Box>
                    <Stack direction="row" sx={{ color: '#f59e0b' }}>{[1,2,3,4,5].map(s => <StarRounded key={s} fontSize="14px" />)}</Stack>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Trusted by 500+ Companies</Typography>
                  </Box>
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>

          {/* --- RIGHT SIDE (Video Portal) --- */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, perspective: '2000px' }}>
            <motion.div
              style={{ y: yRight, rotateY: -5, rotateX: rotateRight }}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: -12 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: '650px' }}>
                <Box sx={{ 
                  position: 'relative', width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 50px 100px -20px rgba(15, 23, 42, 0.2), inset 0 0 0 2px rgba(255,255,255,0.5)'
                }}>
                  {/* Dynamic Video */}
                  <video 
                    autoPlay loop muted playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, mixBlendMode: 'multiply' }}
                  >
                    <source src={pageConfig.video.url} type="video/mp4" />
                  </video>

                  {/* UI Overlay */}
                  <Box sx={{ position: 'absolute', inset: 0, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ width: '100%', p: 2, borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                       <Box sx={{ display: 'flex', gap: 1.5 }}><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} /><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }} /><Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#22c55e' }} /></Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
                       <Box sx={{ width: '70px', height: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '20px', backdropFilter: 'blur(10px)' }} />
                       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <Box sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: '24px', p: 3, position: 'relative', overflow: 'hidden' }}>
                             <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '1px' }}>REVENUE FLOW</Typography>
                             <Typography variant="h4" sx={{ color: '#0f172a', fontWeight: 800 }}>{pageConfig.stats.revenue}</Typography>
                             <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(180deg, rgba(99,102,241,0.2) 0%, transparent 100%)', clipPath: 'polygon(0 100%, 0 40%, 20% 60%, 40% 30%, 60% 50%, 80% 20%, 100% 40%, 100% 100%)' }} />
                          </Box>
                       </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Floating Widgets */}
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '15%', right: '-40px', zIndex: 10 }}>
                   <Paper sx={{ p: 2, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 30px 60px rgba(0,0,0,0.15)', backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.9)' }}>
                      <Box sx={{ width: 48, height: 48, bgcolor: '#dcfce7', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircleRounded sx={{ color: '#166534' }} /></Box>
                      <Box><Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>STATUS</Typography><Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>Approved</Typography></Box>
                   </Paper>
                </motion.div>

                <motion.div animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ position: 'absolute', bottom: '20%', left: '-50px', zIndex: 10 }}>
                   <Paper sx={{ p: 2, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 30px 60px rgba(0,0,0,0.15)', backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.9)' }}>
                      <Box sx={{ width: 48, height: 48, bgcolor: '#e0e7ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUpRounded sx={{ color: '#4338ca' }} /></Box>
                      <Box><Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>SAVINGS</Typography><Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{pageConfig.stats.savings}</Typography></Box>
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