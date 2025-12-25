import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, IconButton, Avatar, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DashboardRounded, 
  ReceiptLongRounded, 
  FactCheckRounded, 
  InsertChartRounded, 
  HistoryRounded, 
  SettingsRounded, 
  LogoutRounded,
  NotificationsNoneRounded,
  SearchRounded,
  TrendingUpRounded,
  BoltRounded,
  CreditCardRounded,
  MoreVertRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded
} from '@mui/icons-material';

// --- 1. MOCK DATA & CONFIG ---
const sidebarItems = [
  { text: 'Dashboard', icon: <DashboardRounded />, path: '/dashboard', color: '#6366f1' },
  { text: 'Expenses', icon: <ReceiptLongRounded />, path: '/dashboard/expenses', color: '#10b981' },
  { text: 'Approvals', icon: <FactCheckRounded />, path: '/dashboard/approvals', color: '#f59e0b' },
  { text: 'Reports', icon: <InsertChartRounded />, path: '/dashboard/reports', color: '#ec4899' },
  { text: 'Audit Logs', icon: <HistoryRounded />, path: '/dashboard/audit-logs', color: '#8b5cf6' },
];

const statsData = [
  { label: 'Total Spent', value: '$14,250', change: '+12%', icon: <TrendingUpRounded />, color: '#6366f1', graph: 'polygon(0 100%, 0 60%, 25% 80%, 50% 40%, 75% 50%, 100% 20%, 100% 100%)' },
  { label: 'Pending Requests', value: '12', change: '-2', icon: <BoltRounded />, color: '#f59e0b', graph: 'polygon(0 100%, 0 80%, 25% 60%, 50% 70%, 75% 40%, 100% 60%, 100% 100%)' },
  { label: 'Approved', value: '128', change: '+24', icon: <FactCheckRounded />, color: '#10b981', graph: 'polygon(0 100%, 0 70%, 25% 50%, 50% 60%, 75% 30%, 100% 10%, 100% 100%)' },
];

const recentTransactions = [
  { id: 1, name: 'AWS Infrastructure', date: 'Today, 10:23 AM', amount: '-$240.00', status: 'Pending', icon: '☁️' },
  { id: 2, name: 'Apple Store', date: 'Yesterday, 4:00 PM', amount: '-$1,299.00', status: 'Approved', icon: '🍎' },
  { id: 3, name: 'Client Dinner', date: 'Oct 24, 8:30 PM', amount: '-$185.50', status: 'Approved', icon: '🍽️' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Animation Variants
  const containerVars = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVars = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', display: 'flex', fontFamily: '"Inter", sans-serif', overflow: 'hidden' }}>
      
      {/* --- 2. AURORA BACKGROUND (Fixed) --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      {/* --- 3. SUPERIOR SIDEBAR --- */}
      <Box sx={{ 
        width: 280, height: '100vh', borderRight: '1px solid rgba(0,0,0,0.05)', 
        p: 3, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', 
        bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', zIndex: 10 
      }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5, px: 1.5 }}>
          <Box sx={{ width: 38, height: 38, borderRadius: '12px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', color: '#fff' }}>
            <CreditCardRounded fontSize="small" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>WealthFlow</Typography>
        </Box>

        {/* Nav Items */}
        <List sx={{ flexGrow: 1 }}>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path || (item.text === 'Dashboard' && location.pathname === '/dashboard');
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1, position: 'relative' }}>
                <ListItemButton 
                  onClick={() => navigate(item.path)}
                  sx={{ borderRadius: '14px', py: 1.5, px: 2, overflow: 'hidden', '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                >
                  {isActive && (
                    <Box component={motion.div} layoutId="activeTab" transition={{ type: "spring", stiffness: 400, damping: 30 }} sx={{ position: 'absolute', inset: 0, borderRadius: '14px', background: `linear-gradient(90deg, ${item.color}15 0%, transparent 100%)`, borderLeft: `3px solid ${item.color}` }} />
                  )}
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? item.color : '#94a3b8', transition: 'color 0.3s' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#0f172a' : '#64748b' }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Logout */}
        <Button startIcon={<LogoutRounded />} onClick={handleLogout} sx={{ justifyContent: 'flex-start', color: '#ef4444', textTransform: 'none', fontWeight: 600, px: 3, py: 1.5, borderRadius: '14px', '&:hover': { bgcolor: '#fef2f2' } }}>
          Logout Account
        </Button>
      </Box>

      {/* --- 4. MAIN DASHBOARD CONTENT --- */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, pt: 2, overflowY: 'auto', zIndex: 1, position: 'relative' }}>
        <Container maxWidth="xl">
          
          <motion.div variants={containerVars} initial="hidden" animate="visible">
            
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 0.5 }}>Overview</Typography>
                <Typography variant="body1" sx={{ color: '#64748b' }}>Welcome back, John Doe</Typography>
              </Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}><SearchRounded /></IconButton>
                <IconButton sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}><NotificationsNoneRounded /></IconButton>
                <Avatar sx={{ bgcolor: '#0f172a', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>JD</Avatar>
              </Stack>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statsData.map((stat, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div variants={itemVars} whileHover={{ y: -5 }}>
                    <Paper sx={{ 
                      p: 3, borderRadius: '24px', position: 'relative', overflow: 'hidden',
                      bgcolor: '#fff', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)'
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: `${stat.color}10`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: '#f8fafc', borderRadius: '20px', px: 1.5, py: 0.5, height: 'fit-content' }}>
                          <ArrowUpwardRounded sx={{ fontSize: 14, color: '#10b981' }} />
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#10b981' }}>{stat.change}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>{stat.value}</Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>{stat.label}</Typography>
                      
                      {/* CSS-Only Living Chart Background */}
                      <Box sx={{ 
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', opacity: 0.2,
                        background: `linear-gradient(0deg, ${stat.color} 0%, transparent 100%)`,
                        clipPath: stat.graph
                      }} />
                      <Box sx={{ 
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', opacity: 1,
                        borderTop: `2px solid ${stat.color}`,
                        clipPath: stat.graph
                      }} />
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Content Split: 70% Chart / 30% Cards */}
            <Grid container spacing={3}>
              
              {/* Left: Recent Activity */}
              <Grid item xs={12} md={8}>
                <motion.div variants={itemVars}>
                  <Paper sx={{ 
                    p: 3, borderRadius: '24px', bgcolor: '#fff', border: '1px solid rgba(0,0,0,0.04)', 
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', minHeight: '400px'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Transactions</Typography>
                      <Button endIcon={<ArrowUpwardRounded sx={{ rotate: '90deg' }} />} sx={{ color: '#6366f1', textTransform: 'none', fontWeight: 600 }}>View All</Button>
                    </Box>

                    <List>
                      {recentTransactions.map((tx) => (
                        <React.Fragment key={tx.id}>
                          <ListItem sx={{ px: 0, py: 2 }}>
                            <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', mr: 2 }}>
                              {tx.icon}
                            </Box>
                            <ListItemText 
                              primary={<Typography sx={{ fontWeight: 600, color: '#0f172a' }}>{tx.name}</Typography>}
                              secondary={tx.date}
                            />
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>{tx.amount}</Typography>
                              <Typography variant="caption" sx={{ 
                                color: tx.status === 'Approved' ? '#10b981' : '#f59e0b', 
                                fontWeight: 600, bgcolor: tx.status === 'Approved' ? '#dcfce7' : '#fef3c7', 
                                px: 1, py: 0.2, borderRadius: '6px' 
                              }}>
                                {tx.status}
                              </Typography>
                            </Box>
                          </ListItem>
                          <Divider sx={{ borderStyle: 'dashed' }} />
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </motion.div>
              </Grid>

              {/* Right: The "Cool" Credit Card */}
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVars}>
                  {/* Glass Credit Card */}
                  <Box 
                    sx={{ 
                      p: 3, borderRadius: '24px', mb: 3, position: 'relative', overflow: 'hidden', height: '220px',
                      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff',
                      boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.5)',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.02) rotate(1deg)' }
                    }}
                  >
                    <Box sx={{ position: 'absolute', top: '-50%', right: '-20%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)' }} />
                    
                    <Stack justifyContent="space-between" sx={{ height: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ opacity: 0.7, fontWeight: 500 }}>Enterprise Card</Typography>
                        <CreditCardRounded />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontFamily: 'monospace', letterSpacing: '4px', mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                          **** **** **** 4289
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                         <Box>
                           <Typography variant="caption" sx={{ opacity: 0.7 }}>Card Holder</Typography>
                           <Typography sx={{ fontWeight: 600 }}>John Doe</Typography>
                         </Box>
                         <Box>
                           <Typography variant="caption" sx={{ opacity: 0.7 }}>Expires</Typography>
                           <Typography sx={{ fontWeight: 600 }}>12/28</Typography>
                         </Box>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Quick Action */}
                  <Paper sx={{ p: 3, borderRadius: '24px', bgcolor: '#6366f1', color: '#fff', textAlign: 'center', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Add Expense</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>Quickly upload a receipt.</Typography>
                    <Button 
                      variant="contained" 
                      onClick={() => navigate('/dashboard/expenses')}
                      sx={{ bgcolor: '#fff', color: '#6366f1', borderRadius: '12px', fontWeight: 700, textTransform: 'none', px: 4, '&:hover': { bgcolor: '#f1f5f9' } }}
                    >
                      Scan Receipt
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>

            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;