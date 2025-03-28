import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "../service/api";

const ExpensePage = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
    status: "PENDING",
  });
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Fetch Expenses from Backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
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

  // Handlers for Add Expense Dialog
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  // Handlers for Edit Expense Dialog
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

  // Submit Add Expense
  const handleSubmitAdd = async () => {
    try {
      const response = await api.post("/expenses", newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({
        date: "",
        category: "",
        amount: "",
        description: "",
        status: "PENDING",
      });
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Submit Update Expense
  const handleSubmitEdit = async () => {
    try {
      const response = await api.put(
        `/expenses/${selectedExpense.id}`,
        selectedExpense
      );
      setExpenses(
        expenses.map((exp) =>
          exp.id === selectedExpense.id ? response.data : exp
        )
      );
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Expense Management
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Add Expense
        </Button>
      </Stack>

      {/* Expense Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expense ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Receipt URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.userName || "Unknown"}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>₹{expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  {expense.receiptUrl ? (
                    <a
                      href={expense.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No Receipt"
                  )}
                </TableCell>
                <TableCell>{expense.status}</TableCell>
                <TableCell>
                  {expense.createdAt
                    ? new Date(expense.createdAt).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEdit(expense)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(expense.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Expense Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            name="date"
            fullWidth
            sx={{ mt: 2 }}
            value={newExpense.date}
            onChange={(e) => handleChange(e, setNewExpense)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Category"
            name="category"
            select
            fullWidth
            sx={{ mt: 2 }}
            value={newExpense.category}
            onChange={(e) => handleChange(e, setNewExpense)}
          >
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Office Supplies">Office Supplies</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Amount"
            type="number"
            name="amount"
            fullWidth
            sx={{ mt: 2 }}
            value={newExpense.amount}
            onChange={(e) => handleChange(e, setNewExpense)}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            sx={{ mt: 2 }}
            value={newExpense.description}
            onChange={(e) => handleChange(e, setNewExpense)}
          />
          <TextField
            label="Receipt URL"
            name="receiptUrl"
            fullWidth
            sx={{ mt: 2 }}
            value={newExpense.receiptUrl || ""}
            onChange={(e) => handleChange(e, setNewExpense)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button onClick={handleSubmitAdd} color="primary">
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Expense Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          {selectedExpense && (
            <>
              <TextField
                label="Date"
                type="date"
                name="date"
                fullWidth
                sx={{ mt: 2 }}
                value={selectedExpense.date || ""}
                onChange={(e) => handleChange(e, setSelectedExpense)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Category"
                name="category"
                select
                fullWidth
                sx={{ mt: 2 }}
                value={selectedExpense.category || ""}
                onChange={(e) => handleChange(e, setSelectedExpense)}
              >
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
              </TextField>
              <TextField
                label="Amount"
                type="number"
                name="amount"
                fullWidth
                sx={{ mt: 2 }}
                value={selectedExpense.amount || ""}
                onChange={(e) => handleChange(e, setSelectedExpense)}
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                sx={{ mt: 2 }}
                value={selectedExpense.description || ""}
                onChange={(e) => handleChange(e, setSelectedExpense)}
              />
              <TextField
                label="Receipt URL"
                name="receiptUrl"
                fullWidth
                sx={{ mt: 2 }}
                value={selectedExpense.receiptUrl || ""}
                onChange={(e) => handleChange(e, setSelectedExpense)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Update Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpensePage;
