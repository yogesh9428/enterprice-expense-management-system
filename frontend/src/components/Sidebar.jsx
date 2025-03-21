
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Receipt, CheckCircle, BarChart, History, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Expenses', icon: <Receipt />, path: '/dashboard/expenses' },
    { text: 'Approvals', icon: <CheckCircle />, path: '/dashboard/approvals' },
    { text: 'Reports', icon: <BarChart />, path: '/dashboard/reports' },
    { text: 'Audit Logs', icon: <History />, path: '/dashboard/audit-logs' },
    { text: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
    { text: 'Logout', icon: <ExitToApp />, path: '/' }
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
