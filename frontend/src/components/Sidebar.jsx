import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { 
  DashboardRounded, 
  ReceiptLongRounded, 
  FactCheckRounded, 
  InsertChartRounded, 
  HistoryRounded, 
  SettingsRounded, 
  LogoutRounded,
  PieChartRounded
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardRounded />, path: '/dashboard', color: '#6366f1' },
    { text: 'Expenses', icon: <ReceiptLongRounded />, path: '/dashboard/expenses', color: '#10b981' },
    { text: 'Approvals', icon: <FactCheckRounded />, path: '/dashboard/approvals', color: '#f59e0b' },
    { text: 'Reports', icon: <InsertChartRounded />, path: '/dashboard/reports', color: '#ec4899' },
    { text: 'Audit Logs', icon: <HistoryRounded />, path: '/dashboard/audit-logs', color: '#8b5cf6' },
  ];

  const bottomItems = [
    { text: 'Settings', icon: <SettingsRounded />, path: '/dashboard/settings', color: '#64748b' },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',          // Full Viewport Height
        position: 'sticky',       // 👈 The Fix: Sticks to the viewport
        top: 0,                   // 👈 The Fix: Anchors to the top
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff',
        borderRight: '1px solid rgba(0, 0, 0, 0.05)',
        p: 3,
        zIndex: 10,
        overflowY: 'auto',        // Allows scrolling inside sidebar if screen is short
        flexShrink: 0             // Prevents sidebar from being squashed
      }}
    >
      {/* 1. Colorful Logo Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5, px: 1.5 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(255, 107, 107, 0.25)',
            color: '#fff',
          }}
        >
          <PieChartRounded fontSize="small" />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#334155', letterSpacing: '-0.5px' }}>
          WealthFlow
        </Typography>
      </Box>

      {/* 2. Navigation Items */}
      <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, px: 2, mb: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}>
        Main Menu
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1, position: 'relative' }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '16px',
                  py: 1.5,
                  px: 2.5,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
                }}
              >
                {isActive && (
                  <Box
                    component={motion.div}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                      background: `linear-gradient(90deg, ${item.color}15 0%, ${item.color}05 100%)`, 
                      border: `1px solid ${item.color}20`,
                    }}
                  />
                )}

                <ListItemIcon sx={{ 
                  minWidth: 40, 
                  color: isActive ? item.color : '#cbd5e1', 
                  transition: 'color 0.3s ease'
                }}>
                  {item.icon}
                </ListItemIcon>
                
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.95rem', 
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#334155' : '#64748b',
                  }} 
                />
                
                {isActive && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: item.color }} />
                  </motion.div>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

      <List>
        {bottomItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: '12px',
                py: 1.2,
                px: 2,
                '&:hover': { bgcolor: '#f8fafc' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: item.color }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500, color: '#64748b' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        
        <ListItem disablePadding sx={{ mt: 1 }}>
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("token");
              navigate('/');
            }}
            sx={{
              borderRadius: '12px',
              py: 1.2,
              px: 2,
              '&:hover': { bgcolor: '#fee2e2' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#ef4444' }}>
              <LogoutRounded />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600, color: '#ef4444' }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;