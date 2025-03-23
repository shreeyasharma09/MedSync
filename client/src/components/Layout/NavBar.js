import React from 'react';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';

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
  const navigate = useNavigate();
  const auth = getAuth();
  const isLoggedIn = !!auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/Landing');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" elevation={0} style={{backgroundColor: 'white'}}>
      <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" style={{color: '#3e4b32', fontWeight: 'bold'}}>
          <span style={{color: '#708b69'}}>Med</span>Sync
        </Typography>

        {!isLoggedIn && <Box>{<NavLink to="/Landing" label="Landing" />}</Box>}

        {isLoggedIn && (
          <Box>
            {/* <NavLink to="/Landing" label="Landing" /> */}
            <NavLink to="/PatientDashboard" label="Dashboard" />
            <NavLink to="/PatientBookings" label="Bookings" />
            <NavLink to="/profile/p" label="Profile" />
            <Button
              onClick={handleLogout}
              color="inherit"
              style={{color: 'black'}}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
