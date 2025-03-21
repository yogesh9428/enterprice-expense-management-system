import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: `240px` }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Management
        </Typography>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => navigate('/dashboard/profile')}> Profile </MenuItem>
          <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
