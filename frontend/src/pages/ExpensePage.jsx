import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, Button, Box, Dialog, DialogActions, DialogContent, 
  DialogTitle, TextField, MenuItem, IconButton, Stack, Paper, Chip, Avatar, 
  Tooltip, InputAdornment, Grid
} from "@mui/material";
import { 
  EditOutlined, DeleteOutlineRounded, AddRounded, SearchRounded, 
  FilterListRounded, DescriptionOutlined, FlightTakeoffRounded, 
  RestaurantRounded, LaptopMacRounded, BuildRounded, LocalOfferRounded, 
  ReceiptLongRounded, CategoryRounded, CalendarTodayRounded, AttachMoneyRounded 
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import api from "../service/api";

// --- HELPERS FOR VISUALS ---
const getCategoryIcon = (category) => {
  const c = category?.toLowerCase() || '';
  if (c.includes('travel')) return <FlightTakeoffRounded sx={{ color: '#10b981' }} />;
  if (c.includes('food') || c.includes('meal')) return <RestaurantRounded sx={{ color: '#f59e0b' }} />;
  if (c.includes('office') || c.includes('supplies')) return <LaptopMacRounded sx={{ color: '#6366f1' }} />;
  if (c.includes('maintenance')) return <BuildRounded sx={{ color: '#64748b' }} />;
  return <LocalOfferRounded sx={{ color: '#ec4899' }} />;
};

const getStatusColor = (status) => {
  const s = status?.toUpperCase() || 'PENDING';
  if (s === 'APPROVED') return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
  if (s === 'REJECTED') return { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' };
  return { bg: '#fef3c7', text: '#b45309', border: '#fde68a' }; // Pending
};

const ExpensePage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newExpense, setNewExpense] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
    status: "PENDING",
    receiptUrl: ""
  });
  const [selectedExpense, setSelectedExpense] = useState(null);

  // --- API LOGIC ---
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        // Using the api instance if configured, or axios direct
        const response = await axios.get("http://localhost:8080/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (expense) => {
    setSelectedExpense(expense);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setSelectedExpense(null);
    setOpenEdit(false);
  };

  const handleChange = (e, setExpenseFn) => {
    setExpenseFn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitAdd = async () => {
    try {
      const response = await api.post("/expenses", newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({ date: "", category: "", amount: "", description: "", status: "PENDING", receiptUrl: "" });
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await api.put(`/expenses/${selectedExpense.id}`, selectedExpense);
      setExpenses(expenses.map((exp) => (exp.id === selectedExpense.id ? response.data : exp)));
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Filter Logic
  const filteredExpenses = expenses.filter(exp => 
    exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', bgcolor: '#ffffff', fontFamily: '"Inter", sans-serif' }}>
      
      {/* --- 1. SUPERIOR AURORA BACKGROUND --- */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)', animation: 'float 20s infinite ease-in-out alternate' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%)', animation: 'float 25s infinite ease-in-out alternate-reverse' }} />
        <style>{`@keyframes float { 0% { transform: translate(0,0); } 100% { transform: translate(20px, 40px); } }`}</style>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>
        
        {/* --- 2. HEADER SECTION --- */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={5} spacing={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Expense Management
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Track and approve team expenditures.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleOpenAdd}
            startIcon={<AddRounded />}
            sx={{
              bgcolor: '#0f172a', color: '#fff', px: 3, py: 1.5, borderRadius: '14px',
              textTransform: 'none', fontWeight: 600, boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              '&:hover': { bgcolor: '#1e293b', transform: 'translateY(-2px)' }, transition: 'all 0.2s'
            }}
          >
            New Expense
          </Button>
        </Stack>

        {/* --- 3. SEARCH BAR --- */}
        <Paper elevation={0} sx={{ 
          p: 2, mb: 4, borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)',
          bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', display: 'flex', gap: 2 
        }}>
          <TextField 
            placeholder="Search by description or category..." 
            variant="outlined" fullWidth size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#fff', '& fieldset': { borderColor: 'transparent' } } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded sx={{ color: '#94a3b8' }} /></InputAdornment> }}
          />
          <Button variant="outlined" startIcon={<FilterListRounded />} sx={{ borderRadius: '12px', textTransform: 'none', borderColor: '#e2e8f0', color: '#64748b', bgcolor: '#fff' }}>
            Filter
          </Button>
        </Paper>

        {/* --- 4. FLOATING ROWS LIST --- */}
        <Stack spacing={2}>
          <AnimatePresence>
            {filteredExpenses.map((expense, index) => {
              const statusStyle = getStatusColor(expense.status);
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Paper elevation={0} sx={{
                    p: 2.5, borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)', bgcolor: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.2s ease', cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.005)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', borderColor: '#6366f1' }
                  }}>
                    {/* Icon & Details */}
                    <Stack direction="row" spacing={3} alignItems="center" sx={{ flex: 2 }}>
                      <Avatar sx={{ bgcolor: '#f8fafc', borderRadius: '14px', width: 48, height: 48 }}>
                        {getCategoryIcon(expense.category)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>{expense.description}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                           <CalendarTodayRounded sx={{ fontSize: 12, color: '#94a3b8' }} />
                           <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                             {expense.date ? new Date(expense.date).toLocaleDateString() : 'No Date'}
                           </Typography>
                           <Box sx={{ width: 4, height: 4, bgcolor: '#cbd5e1', borderRadius: '50%' }} />
                           <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>{expense.category}</Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    {/* Status Pill */}
                    <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                      <Chip 
                        label={expense.status} 
                        size="small"
                        sx={{ 
                          bgcolor: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}`,
                          fontWeight: 700, borderRadius: '8px', fontSize: '0.75rem'
                        }} 
                      />
                    </Box>

                    {/* Amount & Actions */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, justifyContent: 'flex-end' }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>₹{expense.amount}</Typography>
                      
                      {expense.receiptUrl && (
                        <Tooltip title="View Receipt">
                          <IconButton href={expense.receiptUrl} target="_blank" size="small" sx={{ bgcolor: '#f1f5f9' }}>
                            <DescriptionOutlined fontSize="small" sx={{ color: '#64748b' }} />
                          </IconButton>
                        </Tooltip>
                      )}

                      <IconButton size="small" onClick={() => handleOpenEdit(expense)} sx={{ color: '#6366f1', bgcolor: '#e0e7ff', '&:hover': { bgcolor: '#c7d2fe' } }}>
                        <EditOutlined fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(expense.id)} sx={{ color: '#ef4444', bgcolor: '#fee2e2', '&:hover': { bgcolor: '#fecaca' } }}>
                        <DeleteOutlineRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Paper>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredExpenses.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 10, opacity: 0.5 }}>
              <Typography variant="h6">No expenses found.</Typography>
            </Box>
          )}
        </Stack>
      </Container>

      {/* --- ADD EXPENSE DIALOG (Glassmorphic) --- */}
      <Dialog 
        open={openAdd} onClose={handleCloseAdd} 
        PaperProps={{ sx: { borderRadius: '24px', backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, textAlign: 'center' }}>Add New Expense</DialogTitle>
        <DialogContent>
           <Stack spacing={2} sx={{ mt: 1, minWidth: '350px' }}>
              <TextField label="Date" type="date" name="date" fullWidth value={newExpense.date} onChange={(e) => handleChange(e, setNewExpense)} InputLabelProps={{ shrink: true }} sx={modernInputStyles} />
              <TextField label="Category" name="category" select fullWidth value={newExpense.category} onChange={(e) => handleChange(e, setNewExpense)} sx={modernInputStyles}>
                {["Travel", "Food", "Office Supplies", "Entertainment", "Utilities", "Maintenance", "Other"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <TextField label="Amount" type="number" name="amount" fullWidth value={newExpense.amount} onChange={(e) => handleChange(e, setNewExpense)} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} sx={modernInputStyles} />
              <TextField label="Description" name="description" fullWidth value={newExpense.description} onChange={(e) => handleChange(e, setNewExpense)} sx={modernInputStyles} />
              <TextField label="Receipt URL" name="receiptUrl" fullWidth value={newExpense.receiptUrl} onChange={(e) => handleChange(e, setNewExpense)} sx={modernInputStyles} />
           </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleCloseAdd} sx={{ color: '#64748b', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleSubmitAdd} variant="contained" sx={{ bgcolor: '#0f172a', borderRadius: '12px', px: 4, py: 1, fontWeight: 600 }}>Save Expense</Button>
        </DialogActions>
      </Dialog>

      {/* --- EDIT EXPENSE DIALOG --- */}
      <Dialog 
        open={openEdit} onClose={handleCloseEdit}
        PaperProps={{ sx: { borderRadius: '24px', backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, textAlign: 'center' }}>Edit Expense</DialogTitle>
        <DialogContent>
          {selectedExpense && (
            <Stack spacing={2} sx={{ mt: 1, minWidth: '350px' }}>
              <TextField label="Date" type="date" name="date" fullWidth value={selectedExpense.date || ""} onChange={(e) => handleChange(e, setSelectedExpense)} InputLabelProps={{ shrink: true }} sx={modernInputStyles} />
              <TextField label="Category" name="category" select fullWidth value={selectedExpense.category || ""} onChange={(e) => handleChange(e, setSelectedExpense)} sx={modernInputStyles}>
                {["Travel", "Food", "Office Supplies", "Entertainment", "Utilities", "Maintenance", "Other"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <TextField label="Amount" type="number" name="amount" fullWidth value={selectedExpense.amount || ""} onChange={(e) => handleChange(e, setSelectedExpense)} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} sx={modernInputStyles} />
              <TextField label="Description" name="description" fullWidth value={selectedExpense.description || ""} onChange={(e) => handleChange(e, setSelectedExpense)} sx={modernInputStyles} />
              <TextField label="Receipt URL" name="receiptUrl" fullWidth value={selectedExpense.receiptUrl || ""} onChange={(e) => handleChange(e, setSelectedExpense)} sx={modernInputStyles} />
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={handleCloseEdit} sx={{ color: '#64748b', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleSubmitEdit} variant="contained" sx={{ bgcolor: '#0f172a', borderRadius: '12px', px: 4, py: 1, fontWeight: 600 }}>Update</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

// --- STYLES ---
const modernInputStyles = {
  '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f8fafc', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: '#e2e8f0' }, '&.Mui-focused fieldset': { borderColor: '#6366f1' } }
};

export default ExpensePage;