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

  const userRole = localStorage.getItem('userRole');

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
    <AppBar
      position="static"
      elevation={0}
      style={{backgroundColor: 'white', borderBottom: '1px solid #e0e0e0'}}
    >
      <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" style={{color: '#3e4b32', fontWeight: 'bold'}}>
          <span style={{color: '#708b69'}}>Med</span>Sync
        </Typography>

        {!isLoggedIn && (
          <Box>
            <NavLink to="/Landing" label="Landing" />
          </Box>
        )}

        {isLoggedIn && userRole === 'patient' && (
          <Box>
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

        {isLoggedIn && userRole === 'healthcare' && (
          <Box>
            <NavLink to="/HealthcareDashboard" label="Dashboard" />
            <NavLink to="/HealthcareBookings" label="Bookings" />
            <NavLink to="/profile/hp" label="Profile" />
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
