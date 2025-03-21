import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([
    { id: 1, user: 'John Doe', action: 'Created Expense', timestamp: '2024-03-15 10:30 AM' },
    { id: 2, user: 'Alice Smith', action: 'Approved Expense', timestamp: '2024-03-15 11:00 AM' }
  ]);
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(log => log.user.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>Audit Logs</Typography>
      
      {/* Filter Input */}
      <TextField 
        label="Filter by User" 
        fullWidth 
        sx={{ mb: 2 }} 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />

      {/* Logs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AuditLogsPage;
