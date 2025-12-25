import React, { useState } from 'react';
import { Container, Typography, Box, Stack, Paper, Chip, Avatar, IconButton, TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  HistoryRounded, 
  SearchRounded, 
  FilterListRounded, 
  SecurityRounded,
  CodeRounded,
  FingerprintRounded,
  LoginRounded,
  DeleteForeverRounded,
  CloudUploadRounded
} from '@mui/icons-material';

// --- 1. ENHANCED MOCK DATA ---
const initialLogs = [
  { id: 'LOG-9928', user: 'John Doe', action: 'LOGIN_SUCCESS', details: 'Authenticated via OAuth (Google)', ip: '192.168.1.42', time: 'Just now', type: 'security' },
  { id: 'LOG-9927', user: 'Sarah Smith', action: 'EXPENSE_APPROVED', details: 'Approved Expense #4029 ($1,200)', ip: '10.0.0.12', time: '10 mins ago', type: 'success' },
  { id: 'LOG-9926', user: 'John Doe', action: 'UPDATE_PROFILE', details: 'Changed password recovery email', ip: '192.168.1.42', time: '1 hour ago', type: 'warning' },
  { id: 'LOG-9925', user: 'Admin System', action: 'AUTO_REJECT', details: 'Rejected Expense #3999 (Policy Violation)', ip: 'SYSTEM', time: '2 hours ago', type: 'error' },
  { id: 'LOG-9924', user: 'Mike Ross', action: 'UPLOAD_RECEIPT', details: 'Uploaded receipt_nov.pdf', ip: '172.16.0.5', time: 'Yesterday', type: 'info' },
];

const getLogStyle = (type) => {
  switch (type) {
    case 'security': return { color: '#6366f1', icon: <LoginRounded />, bg: '#e0e7ff' }; // Indigo
    case 'error': return { color: '#ef4444', icon: <DeleteForeverRounded />, bg: '#fee2e2' }; // Red
    case 'warning': return { color: '#f59e0b', icon: <SecurityRounded />, bg: '#fef3c7' }; // Amber
    case 'success': return { color: '#10b981', icon: <FingerprintRounded />, bg: '#dcfce7' }; // Emerald
    case 'info': return { color: '#0ea5e9', icon: <CloudUploadRounded />, bg: '#e0f2fe' }; // Sky
    default: return { color: '#64748b', icon: <CodeRounded />, bg: '#f1f5f9' }; // Slate
  }
};

const AuditLogsPage = () => {
  const [filter, setFilter] = useState('');
  
  const filteredLogs = initialLogs.filter(log => 
    log.user.toLowerCase().includes(filter.toLowerCase()) || 
    log.action.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* --- 2. PULSE BACKGROUND (Subtle) --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-20%', left: '20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 70%)', animation: 'pulse 10s infinite ease-in-out' }} />
        <style>{`@keyframes pulse { 0% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } 100% { opacity: 0.5; transform: scale(1); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>
        
        {/* --- 3. HEADER --- */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={6} spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <HistoryRounded sx={{ color: '#64748b' }} /> Security Trail
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Immutable records of system activity.
            </Typography>
          </Box>
          
          {/* Glass Search Bar */}
          <Paper elevation={0} sx={{ 
            p: 1, pl: 2, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', 
            bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', 
            width: { xs: '100%', md: '300px' }, boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
          }}>
             <SearchRounded sx={{ color: '#94a3b8', mr: 1 }} />
             <TextField 
               placeholder="Search logs..." 
               variant="standard" 
               fullWidth 
               InputProps={{ disableUnderline: true }}
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
             />
             <IconButton size="small"><FilterListRounded /></IconButton>
          </Paper>
        </Stack>

        {/* --- 4. THE TIMELINE --- */}
        <Box sx={{ position: 'relative', pl: { xs: 2, md: 4 } }}>
          
          {/* The Vertical Line */}
          <Box sx={{ position: 'absolute', left: { xs: 20, md: 36 }, top: 20, bottom: 20, width: '2px', bgcolor: '#e2e8f0', zIndex: 0 }} />

          <Stack spacing={3}>
            {filteredLogs.map((log, index) => {
              const style = getLogStyle(log.type);
              
              return (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, position: 'relative', zIndex: 1 }}>
                    
                    {/* The Node (Icon) */}
                    <Box sx={{ 
                      minWidth: 48, height: 48, borderRadius: '14px', bgcolor: '#fff', border: `2px solid ${style.bg}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                      <Box sx={{ color: style.color }}>{style.icon}</Box>
                    </Box>

                    {/* The Card */}
                    <Paper sx={{ 
                      flex: 1, p: 3, borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)', bgcolor: '#fff',
                      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.03)', transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateX(5px)', borderColor: style.color }
                    }}>
                       <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="flex-start" spacing={2}>
                          
                          <Box>
                             <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{log.action}</Typography>
                                <Chip label={log.id} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace', bgcolor: '#f1f5f9', color: '#64748b' }} />
                             </Stack>
                             <Typography variant="body2" sx={{ color: '#475569', mb: 1.5 }}>{log.details}</Typography>
                             
                             <Stack direction="row" alignItems="center" spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                   <Avatar sx={{ width: 18, height: 18, bgcolor: style.color, fontSize: '0.65rem' }}>{log.user.charAt(0)}</Avatar>
                                   <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>{log.user}</Typography>
                                </Stack>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#94a3b8', bgcolor: '#f8fafc', px: 0.8, py: 0.2, borderRadius: '4px', border: '1px solid #f1f5f9' }}>
                                  IP: {log.ip}
                                </Typography>
                             </Stack>
                          </Box>

                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap', bgcolor: '#f8fafc', px: 1, py: 0.5, borderRadius: '8px' }}>
                            {log.time}
                          </Typography>

                       </Stack>
                    </Paper>

                  </Box>
                </motion.div>
              );
            })}
          </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default AuditLogsPage;