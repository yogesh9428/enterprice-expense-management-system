import React, { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ApprovalPage = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-03-15', category: 'Travel', amount: 200, status: 'Pending' },
    { id: 2, date: '2024-03-10', category: 'Food', amount: 50, status: 'Pending' }
  ]);
  
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleOpen = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment('');
  };

  const handleApproval = (status) => {
    setExpenses(expenses.map(exp => 
      exp.id === selectedExpense.id ? { ...exp, status } : exp
    ));
    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Expense Approvals
      </Typography>

      {/* Approvals Table */}
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
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.status}</TableCell>
                <TableCell>
                  {expense.status === 'Pending' && (
                    <>
                      <Button color="success" onClick={() => handleApproval('Approved')}>Approve</Button>
                      <Button color="error" sx={{ ml: 1 }} onClick={() => handleOpen(expense)}>Reject</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Rejection Dialog */}
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
