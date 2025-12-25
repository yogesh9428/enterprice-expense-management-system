import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, Dialog, DialogActions, DialogContent, 
  DialogTitle, TextField, Stack, Paper, Chip, Avatar, IconButton, 
  InputAdornment, Grid
} from '@mui/material';
import { 
  CheckCircleRounded, CancelRounded, SendRounded, SearchRounded, 
  FactCheckRounded, FlightTakeoffRounded, RestaurantRounded, 
  LaptopMacRounded, BuildRounded, LocalOfferRounded, CalendarTodayRounded 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../service/api';

// --- VISUAL HELPERS ---
const getCategoryIcon = (category) => {
  const c = category?.toLowerCase() || '';
  if (c.includes('travel')) return <FlightTakeoffRounded sx={{ color: '#10b981' }} />;
  if (c.includes('food') || c.includes('meal')) return <RestaurantRounded sx={{ color: '#f59e0b' }} />;
  if (c.includes('office') || c.includes('supplies')) return <LaptopMacRounded sx={{ color: '#6366f1' }} />;
  if (c.includes('maintenance')) return <BuildRounded sx={{ color: '#64748b' }} />;
  return <LocalOfferRounded sx={{ color: '#ec4899' }} />;
};

const getStatusColor = (status) => {
  const s = status?.toLowerCase() || 'pending';
  if (s === 'approved') return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
  if (s === 'rejected') return { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' };
  return { bg: '#fef3c7', text: '#b45309', border: '#fde68a' };
};

const ApprovalPage = () => {
  const [approvals, setApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [comment, setComment] = useState('');
  const [expenseId, setExpenseId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      // Assuming the API returns a list of expenses/approvals
      const response = await api.get('/api/approvals/pending');
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching approvals:', error);
    }
  };

  const submitForApproval = async () => {
    if (!expenseId) return;
    setLoading(true);
    try {
      const response = await api.post(`/api/approvals/${expenseId}`);
      // Optimistic UI update or re-fetch
      setApprovals([...approvals, response.data]); 
      setExpenseId('');
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const openRejectModal = (approval) => {
    setSelectedApproval(approval);
    setOpenRejectDialog(true);
  };

  const closeRejectModal = () => {
    setOpenRejectDialog(false);
    setComment('');
    setSelectedApproval(null);
  };

  const handleDecision = async (status, note = '') => {
    if (!selectedApproval && status === 'Rejected') return;
    
    // For direct approve, we might need to pass the approval object if not selected
    const targetId = selectedApproval ? selectedApproval.id : null; 
    
    // Safety check: if clicking Approve directly from list
    const idToUpdate = targetId; 

    try {
      const endpoint = status === 'Approved' 
        ? `/api/approvals/${idToUpdate}/approve` 
        : `/api/approvals/${idToUpdate}/reject`;

      // If passing comment for rejection
      const payload = status === 'Rejected' ? { comment: note } : {};

      await api.put(endpoint, payload);
      
      // Update Local State
      setApprovals(approvals.map(app => 
        app.id === idToUpdate ? { ...app, status } : app
      ));
      
      closeRejectModal();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Wrapper for direct list click
  const onQuickApprove = (approval) => {
    // We need to set state momentarily or handle logic differently based on API design.
    // Assuming we can just hit the endpoint with the ID:
    const update = async () => {
       try {
         await api.put(`/api/approvals/${approval.id}/approve`);
         setApprovals(prev => prev.map(p => p.id === approval.id ? { ...p, status: 'Approved' } : p));
       } catch(e) { console.error(e); }
    }
    update();
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', bgcolor: '#ffffff', fontFamily: '"Inter", sans-serif' }}>
      
      {/* --- 1. SUPERIOR AURORA BACKGROUND --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>
        
        {/* --- 2. HEADER --- */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={5} spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Pending Approvals
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Review and manage expense requests.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'rgba(255,255,255,0.8)', p: 1, pl: 2, borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' }}>
             <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>MANUAL ENTRY</Typography>
             <TextField 
               placeholder="Expense ID" 
               variant="standard" 
               value={expenseId}
               onChange={(e) => setExpenseId(e.target.value)}
               InputProps={{ disableUnderline: true, sx: { fontSize: '0.9rem', width: '100px' } }}
             />
             <Button 
               variant="contained" 
               onClick={submitForApproval}
               disabled={loading || !expenseId}
               sx={{ bgcolor: '#0f172a', color: '#fff', borderRadius: '12px', minWidth: '40px', p: 1, '&:hover': { bgcolor: '#1e293b' } }}
             >
               <SendRounded fontSize="small" />
             </Button>
          </Box>
        </Stack>

        {/* --- 3. THE DECISION DECK (List) --- */}
        <Stack spacing={2}>
          <AnimatePresence>
            {approvals.length > 0 ? (
              approvals.map((approval, index) => {
                const statusStyle = getStatusColor(approval.status);
                const isPending = approval.status === 'Pending' || !approval.status; // adjust based on API

                return (
                  <motion.div
                    key={approval.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Paper elevation={0} sx={{
                      p: 2.5, borderRadius: '24px', border: '1px solid rgba(0,0,0,0.04)', bgcolor: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'all 0.2s ease', 
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)' }
                    }}>
                      
                      {/* Left: Info */}
                      <Stack direction="row" spacing={3} alignItems="center" sx={{ flex: 2 }}>
                        <Avatar sx={{ bgcolor: '#f8fafc', borderRadius: '16px', width: 56, height: 56, color: '#64748b' }}>
                          {getCategoryIcon(approval.category)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1.05rem' }}>
                            {approval.category || "Uncategorized"} Expense
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                             <CalendarTodayRounded sx={{ fontSize: 14, color: '#94a3b8' }} />
                             <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                               {approval.date}
                             </Typography>
                             <Box sx={{ width: 4, height: 4, bgcolor: '#cbd5e1', borderRadius: '50%' }} />
                             <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>ID: #{approval.id}</Typography>
                          </Stack>
                        </Box>
                      </Stack>

                      {/* Middle: Amount & Status Pill */}
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                         <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>${approval.amount}</Typography>
                         <Chip 
                            label={approval.status || 'Pending'} 
                            size="small" 
                            sx={{ 
                              mt: 0.5, bgcolor: statusStyle.bg, color: statusStyle.text, 
                              fontWeight: 700, border: `1px solid ${statusStyle.border}`,
                              borderRadius: '8px'
                            }} 
                         />
                      </Box>

                      {/* Right: Actions */}
                      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        {isPending ? (
                          <>
                             <Button
                               onClick={() => openRejectModal(approval)}
                               variant="outlined"
                               startIcon={<CancelRounded />}
                               sx={{ 
                                 borderColor: '#fee2e2', color: '#ef4444', borderRadius: '12px', textTransform: 'none', fontWeight: 600,
                                 '&:hover': { bgcolor: '#fef2f2', borderColor: '#fecaca' }
                               }}
                             >
                               Reject
                             </Button>
                             <Button
                               onClick={() => onQuickApprove(approval)}
                               variant="contained"
                               startIcon={<CheckCircleRounded />}
                               sx={{ 
                                 bgcolor: '#10b981', color: '#fff', borderRadius: '12px', textTransform: 'none', fontWeight: 600,
                                 boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                                 '&:hover': { bgcolor: '#059669' }
                               }}
                             >
                               Approve
                             </Button>
                          </>
                        ) : (
                          <IconButton disabled sx={{ bgcolor: '#f1f5f9' }}>
                             <FactCheckRounded sx={{ color: '#cbd5e1' }} />
                          </IconButton>
                        )}
                      </Box>
                    </Paper>
                  </motion.div>
                );
              })
            ) : (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h6" sx={{ color: '#94a3b8' }}>All caught up! No pending approvals.</Typography>
              </Box>
            )}
          </AnimatePresence>
        </Stack>

      </Container>

      {/* --- REJECT DIALOG (Glassmorphic) --- */}
      <Dialog 
        open={openRejectDialog} 
        onClose={closeRejectModal}
        PaperProps={{ 
          sx: { 
            borderRadius: '24px', backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.9)', 
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.2)', p: 1, minWidth: '400px'
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, textAlign: 'center', pb: 1 }}>Reason for Rejection</DialogTitle>
        <DialogContent>
           <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', mb: 3 }}>
             Please provide a reason to help the employee understand.
           </Typography>
           <TextField 
             multiline rows={4} 
             placeholder="Type your comment here..." 
             fullWidth 
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             sx={{ 
               '& .MuiOutlinedInput-root': { 
                 borderRadius: '16px', bgcolor: '#f8fafc', 
                 '& fieldset': { borderColor: 'transparent' },
                 '&:hover fieldset': { borderColor: '#e2e8f0' },
                 '&.Mui-focused fieldset': { borderColor: '#ef4444' }
               } 
             }}
           />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 1 }}>
          <Button onClick={closeRejectModal} sx={{ color: '#64748b', fontWeight: 600, borderRadius: '12px', px: 3 }}>Cancel</Button>
          <Button 
            onClick={() => handleDecision('Rejected', comment)} 
            variant="contained" 
            sx={{ bgcolor: '#ef4444', color: '#fff', borderRadius: '12px', px: 4, fontWeight: 600, '&:hover': { bgcolor: '#dc2626' } }}
          >
            Confirm Reject
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ApprovalPage;