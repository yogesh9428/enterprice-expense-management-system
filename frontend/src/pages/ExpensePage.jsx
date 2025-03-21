import React, { useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';

const ExpensePage = () => {
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-03-15', category: 'Travel', amount: 200, status: 'Pending' },
    { id: 2, date: '2024-03-10', category: 'Food', amount: 50, status: 'Approved' }
  ]);
  const [newExpense, setNewExpense] = useState({ date: '', category: '', amount: '', status: 'Pending' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }]);
    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Expense Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Expense
      </Button>

      {/* Expense Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Expense Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField label="Date" type="date" name="date" fullWidth sx={{ mt: 2 }} value={newExpense.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField label="Category" name="category" select fullWidth sx={{ mt: 2 }} value={newExpense.category} onChange={handleChange}>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Office Supplies">Office Supplies</MenuItem>
          </TextField>
          <TextField label="Amount" type="number" name="amount" fullWidth sx={{ mt: 2 }} value={newExpense.amount} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add Expense</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpensePage;
