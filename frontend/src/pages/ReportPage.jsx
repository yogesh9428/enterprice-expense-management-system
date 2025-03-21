import React from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ReportsPage = () => {
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Expenses ($)',
      data: [500, 700, 800, 600, 900, 1200],
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  const categoryData = {
    labels: ['Travel', 'Food', 'Office Supplies'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
    }]
  };

  const handleDownloadReport = () => {
    console.log('Downloading report... (Future API Call)');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>Expense Analytics</Typography>
      
      {/* Monthly Trend Chart */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Monthly Expense Trends</Typography>
        <Bar data={monthlyData} />
      </Paper>

      {/* Category Breakdown Chart */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Category Breakdown</Typography>
        <Pie data={categoryData} />
      </Paper>

      {/* Download Report Button */}
      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={handleDownloadReport}>
          Download Report (PDF)
        </Button>
      </Box>
    </Container>
  );
};

export default ReportsPage;
