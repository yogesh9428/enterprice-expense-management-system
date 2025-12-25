import React from 'react';
import { 
  Container, Typography, Button, Box, Grid, Paper, IconButton, Stack, Avatar 
} from '@mui/material';
import { 
  Bar, Doughnut 
} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { 
  DownloadRounded, CalendarTodayRounded, TrendingUpRounded, 
  PieChartRounded, InsertDriveFileRounded, PictureAsPdfRounded 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// --- CHART CONFIGURATION ---
const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Expenses',
    data: [1200, 1900, 1500, 2200, 1800, 2800],
    backgroundColor: '#6366f1', // Indigo
    borderRadius: 8, // Modern rounded bars
    barThickness: 24,
    hoverBackgroundColor: '#4f46e5',
  }]
};

const categoryData = {
  labels: ['Travel', 'Food', 'Supplies', 'Services'],
  datasets: [{
    data: [35, 25, 20, 20],
    backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#ec4899'],
    borderWidth: 0,
    hoverOffset: 10,
  }]
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }, // Cleaner look without legend
    tooltip: { 
      backgroundColor: '#1e293b', 
      padding: 12, 
      cornerRadius: 12,
      displayColors: false,
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 14, weight: 'bold' }
    }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: 'Inter' }, color: '#94a3b8' } },
    y: { grid: { color: '#f1f5f9', borderDash: [5, 5] }, ticks: { font: { family: 'Inter' }, color: '#94a3b8', callback: (val) => `$${val}` } }
  }
};

const doughnutOptions = {
  cutout: '75%', // Makes it a thin ring (Modern look)
  plugins: {
    legend: { position: 'bottom', labels: { usePointStyle: true, font: { family: 'Inter', size: 12 }, color: '#64748b' } }
  }
};

const ReportsPage = () => {
  
  const handleDownload = (type) => {
    console.log(`Downloading ${type} report...`);
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', bgcolor: '#ffffff', fontFamily: '"Inter", sans-serif' }}>
      
      {/* --- 1. SUPERIOR AURORA BACKGROUND --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>
        
        {/* --- 2. HEADER & KPIS --- */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={6} spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Financial Insights
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Real-time analytics and spending trends.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
             <Paper elevation={0} sx={{ p: 2, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#e0e7ff', color: '#6366f1', borderRadius: '12px' }}><CalendarTodayRounded fontSize="small" /></Avatar>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>PERIOD</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>Last 6 Months</Typography>
                </Box>
             </Paper>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          
          {/* --- 3. MAIN TREND CHART --- */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Paper sx={{ 
                p: 4, borderRadius: '24px', border: '1px solid rgba(0,0,0,0.04)', bgcolor: '#fff',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden'
              }}>
                <Stack direction="row" justifyContent="space-between" mb={4}>
                   <Box>
                     <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Monthly Spending</Typography>
                     <Stack direction="row" alignItems="center" spacing={1}>
                       <TrendingUpRounded sx={{ fontSize: 16, color: '#10b981' }} />
                       <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>+12.5% vs last year</Typography>
                     </Stack>
                   </Box>
                   <IconButton sx={{ bgcolor: '#f8fafc' }}><DownloadRounded fontSize="small" /></IconButton>
                </Stack>
                <Box sx={{ height: 300 }}>
                  <Bar data={monthlyData} options={barOptions} />
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* --- 4. CATEGORY BREAKDOWN --- */}
          <Grid item xs={12} md={4}>
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Paper sx={{ 
                p: 4, borderRadius: '24px', border: '1px solid rgba(0,0,0,0.04)', bgcolor: '#fff',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}>
                 <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Breakdown</Typography>
                    <PieChartRounded sx={{ color: '#cbd5e1' }} />
                 </Box>
                 
                 <Box sx={{ position: 'relative', width: '220px', height: '220px', mb: 2 }}>
                    <Doughnut data={categoryData} options={doughnutOptions} />
                    {/* Centered Text inside Doughnut */}
                    <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -40%)', textAlign: 'center' }}>
                       <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>$11k</Typography>
                       <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>TOTAL</Typography>
                    </Box>
                 </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* --- 5. EXPORT HUB --- */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
           <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: '1px', mb: 2, display: 'block' }}>EXPORT OPTIONS</Typography>
           <Stack direction="row" justifyContent="center" spacing={2}>
              <Button 
                variant="outlined" 
                startIcon={<PictureAsPdfRounded />}
                onClick={() => handleDownload('PDF')}
                sx={{ 
                   borderRadius: '14px', px: 4, py: 1.5, textTransform: 'none', fontWeight: 600,
                   borderColor: '#e2e8f0', color: '#64748b', '&:hover': { bgcolor: '#fff', borderColor: '#cbd5e1', transform: 'translateY(-2px)' }, transition: 'all 0.2s'
                }}
              >
                Download PDF
              </Button>
              <Button 
                variant="contained" 
                startIcon={<InsertDriveFileRounded />}
                onClick={() => handleDownload('Excel')}
                sx={{ 
                   borderRadius: '14px', px: 4, py: 1.5, textTransform: 'none', fontWeight: 600,
                   bgcolor: '#0f172a', color: '#fff', '&:hover': { bgcolor: '#1e293b', transform: 'translateY(-2px)' }, transition: 'all 0.2s',
                   boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                Export CSV
              </Button>
           </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default ReportsPage;