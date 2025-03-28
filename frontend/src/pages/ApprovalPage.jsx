import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { 
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Dialog, DialogActions, DialogContent, DialogTitle, TextField 
} from '@mui/material';

const ApprovalPage = () => {
  const [approvals, setApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [expenseId, setExpenseId] = useState('');

  // Fetch pending approvals
  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      const response = await api.get('/api/approvals/pending');
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching approvals:', error);
    }
  };

  // Submit expense for approval
  const submitForApproval = async () => {
    if (!expenseId) return;
    try {
      const response = await api.post(`/api/approvals/${expenseId}`);
      setApprovals([...approvals, response.data]); // Add new approval to the list
      setExpenseId('');
    } catch (error) {
      console.error('Error submitting expense for approval:', error);
    }
  };

  const handleOpen = (approval) => {
    setSelectedApproval(approval);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment('');
  };

  // Approve or reject expense
  const handleApproval = async (status) => {
    if (!selectedApproval) return;
    try {
      const endpoint = status === 'Approved' 
        ? `/api/approvals/${selectedApproval.id}/approve` 
        : `/api/approvals/${selectedApproval.id}/reject`;

      await api.put(endpoint);
      
      setApprovals(approvals.map(app => 
        app.id === selectedApproval.id ? { ...app, status } : app
      ));
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Expense Approvals
      </Typography>

      {/* Submit Expense for Approval */}
      <TextField
        label="Expense ID"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={expenseId}
        onChange={(e) => setExpenseId(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={submitForApproval}
        sx={{ mb: 3 }}
      >
        Submit for Approval
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvals.map((approval) => (
              <TableRow key={approval.id}>
                <TableCell>{approval.date}</TableCell>
                <TableCell>{approval.category}</TableCell>
                <TableCell>${approval.amount}</TableCell>
                <TableCell>{approval.status}</TableCell>
                <TableCell>
                  {approval.status === 'Pending' && (
                    <>
                      <Button color="success" onClick={() => handleApproval('Approved')}>Approve</Button>
                      <Button color="error" sx={{ ml: 1 }} onClick={() => handleOpen(approval)}>Reject</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reject Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reject Expense</DialogTitle>
        <DialogContent>
          <TextField 
            label="Rejection Comment" 
            fullWidth 
            multiline 
            rows={3} 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleApproval('Rejected')} color="error">Reject</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ApprovalPage;
