import React from 'react';
import { Box } from '@mui/material'; // Removed Toolbar from import
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      
      {/* 1. Changed p: 3 (24px) to p: 3, pt: 2 
            This keeps side padding but pulls the top content up closer to the Navbar.
      */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 2 }}>
        
        <Navbar />
        
        {/* ❌ DELETED: <Toolbar /> 
           This was the "Ghost Spacer" adding 64px of empty space.
        */}

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;