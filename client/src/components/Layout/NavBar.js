import React from 'react';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';

// Mock function to get user role
const getUserRole = () => {
  return localStorage.getItem('userRole') || 'patient';
};

const NavLink = ({to, label}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      component={Link}
      to={to}
      color="inherit"
      style={{
        color: 'black',
        fontWeight: '300',
        textTransform: 'none',
        textDecoration: isActive ? 'underline' : 'none',
      }}
    >
      {label}
    </Button>
  );
};

const NavBar = () => {
  const userRole = getUserRole();
  const profilePath =
    userRole === 'patient' ? '/profile/view-profile' : '/profile/hp';
  const dashboardPath = userRole === 'patient' ? '/PatientDashboard' : '/';

  return (
    <AppBar
      position="static"
      elevation={0}
      style={{backgroundColor: 'white', borderBottom: '1px solid #e0e0e0'}}
    >
      <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" style={{color: '#3e4b32', fontWeight: 'bold'}}>
          <span style={{color: '#708b69'}}>Med</span>Sync
        </Typography>
        <Box>
          <NavLink to="/Landing" label="Landing" />
          <NavLink to={dashboardPath} label="Dashboard" />
          <NavLink to={profilePath} label="Profile" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
