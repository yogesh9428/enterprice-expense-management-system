import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Avatar, Tooltip, Fade, Badge, Stack } from '@mui/material';
import { NotificationsNoneRounded, KeyboardArrowDownRounded, SettingsOutlined, LogoutRounded, AccountCircleOutlined, HomeRounded, ChevronRightRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // --- DYNAMIC BREADCRUMB LOGIC ---
  // Transforms "/dashboard/expenses" into ["Dashboard", "Expenses"]
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Ultra-premium white glass
        backdropFilter: 'blur(24px) saturate(180%)', // The "Apple" blur effect
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        color: '#0f172a',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        top: 0
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, minHeight: '70px !important' }}>
        
        {/* --- LEFT: INTELLIGENT BREADCRUMBS --- */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box 
            onClick={() => navigate('/dashboard')}
            sx={{ 
              display: 'flex', alignItems: 'center', cursor: 'pointer', 
              color: '#64748b', '&:hover': { color: '#6366f1' }, transition: 'color 0.2s' 
            }}
          >
            <HomeRounded sx={{ fontSize: 20 }} />
          </Box>
          
          {pathnames.length > 0 && <ChevronRightRounded sx={{ color: '#cbd5e1', fontSize: 18 }} />}

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {pathnames.map((name, index) => {
                  const isLast = index === pathnames.length - 1;
                  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                  
                  return (
                    <React.Fragment key={name}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: isLast ? 800 : 500, 
                          fontSize: '1rem', 
                          letterSpacing: '-0.01em',
                          color: isLast ? '#0f172a' : '#64748b',
                          textTransform: 'capitalize'
                        }}
                      >
                        {formattedName}
                      </Typography>
                      {!isLast && <ChevronRightRounded sx={{ color: '#cbd5e1', fontSize: 18 }} />}
                    </React.Fragment>
                  );
                })}
              </Stack>
            </motion.div>
          </AnimatePresence>
        </Stack>

        {/* --- RIGHT: ACTIONS & PROFILE --- */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2.5 } }}>
          
          {/* 1. Alive Notification Bell */}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: '#64748b', border: '1px solid transparent', '&:hover': { bgcolor: '#f1f5f9', borderColor: '#e2e8f0' } }}>
              <Badge 
                variant="dot" 
                color="error" 
                overlap="circular"
                sx={{ 
                  '& .MuiBadge-badge': { 
                    backgroundColor: '#ef4444', 
                    boxShadow: '0 0 0 2px #fff',
                    animation: 'pulse 1.5s infinite' // The "Crazy" heartbeat
                  } 
                }}
              >
                <NotificationsNoneRounded />
              </Badge>
              {/* CSS Pulse Animation */}
              <style>{`@keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }`}</style>
            </IconButton>
          </Tooltip>

          {/* 2. Super Pill Profile Trigger */}
          <Box 
            onClick={handleMenuOpen}
            sx={{ 
              display: 'flex', alignItems: 'center', gap: 1.5, 
              cursor: 'pointer', p: 0.7, pr: 2, pl: 0.7,
              borderRadius: '100px', 
              border: '1px solid rgba(0,0,0,0.05)',
              bgcolor: 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s ease',
              '&:hover': { bgcolor: '#fff', borderColor: '#cbd5e1', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }
            }}
          >
            <Avatar 
              sx={{ 
                width: 36, height: 36, fontSize: '0.85rem', fontWeight: 700, 
                bgcolor: '#0f172a', color: '#fff',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)' 
              }}
            >
              JD
            </Avatar>
            
            <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2, color: '#0f172a' }}>
                John Doe
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.02em' }}>
                MANAGER
              </Typography>
            </Box>
            
            <KeyboardArrowDownRounded sx={{ color: '#94a3b8', fontSize: 18 }} />
          </Box>

          {/* 3. Floating Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            disableScrollLock={true}
            PaperProps={{
              sx: {
                mt: 2, minWidth: 240, borderRadius: '20px', 
                boxShadow: '0 40px 80px -15px rgba(0,0,0,0.1)', 
                border: '1px solid rgba(0,0,0,0.05)', 
                p: 1.5,
                backgroundImage: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)'
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.5, mb: 1, bgcolor: '#f1f5f9', borderRadius: '12px' }}>
               <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>John Doe</Typography>
               <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>john.doe@enterprise.com</Typography>
            </Box>

            <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/profile'); }} sx={menuItemStyle}>
              <AccountCircleOutlined sx={menuIconStyle} /> Profile
            </MenuItem>
            
            <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard/settings'); }} sx={menuItemStyle}>
              <SettingsOutlined sx={menuIconStyle} /> Settings
            </MenuItem>

            <Box sx={{ my: 1, borderTop: '1px solid rgba(0,0,0,0.05)' }} />
            
            <MenuItem 
              onClick={() => { handleMenuClose(); localStorage.removeItem("token"); navigate('/'); }}
              sx={{ ...menuItemStyle, color: '#EF4444', '&:hover': { bgcolor: '#FEF2F2' } }}
            >
              <LogoutRounded sx={{ ...menuIconStyle, color: '#EF4444' }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// --- STYLES ---
const menuItemStyle = {
  fontSize: '0.9rem', fontWeight: 600, borderRadius: '12px', gap: 1.5, py: 1.2, color: '#475569', mb: 0.5,
  '&:hover': { bgcolor: '#fff', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
  transition: 'all 0.2s ease'
};

const menuIconStyle = { fontSize: 20, color: '#94a3b8' };

export default Navbar;