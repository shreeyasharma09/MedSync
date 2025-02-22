import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import SignupFormP from "./signupP";
import SignupFormH from "./signupH";
import ConfirmationVerifyH from "./ConfirmationVerifyH";
import LandingPage from "./Landing";
// import Profile from "../Profile";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Button 
      href={to} 
      color="inherit" 
      style={{ 
        color: "black", 
        fontWeight: "300", 
        textTransform: "none", 
        textDecoration: isActive ? "underline" : "none" 
      }}
    >
      {label}
    </Button>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <AppBar position="static" elevation={0} style={{ backgroundColor: "white", borderBottom: "1px solid #e0e0e0" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" style={{ color: "#3e4b32", fontWeight: "bold" }}>
              <span style={{ color: "#708b69" }}>Med</span>Sync
            </Typography>
            <Box>
              <NavLink to="/Landing" label="LandingPage" />
              <NavLink to="/Home" label="Home" />
              <NavLink to="/SignUpP" label="Patient-Sign Up" />
              <NavLink to="/SignUpHP" label="Health Professional-Sign Up" />
              <NavLink to="/Profile" label="Profile" />
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/SignUpP" element={<SignupFormP />} />
          <Route path="/ConfirmationVerifyH" element={<ConfirmationVerifyH />} />
          <Route path="/SignUpHP" element={<SignupFormH />} />
          <Route path="/Landing" element={<LandingPage />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
