import React, { useState } from "react";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const patientCareImage = "/assets/patient-care.png";
  const healthcarePractitionerImage = "/assets/healthcare-practitioner.png";

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole === "patient") {
      navigate("/SignUpPatient");
    } else if (selectedRole === "healthcare") {
      navigate("/SignUpHP");
    }
  };

  return (
    <div style={{ backgroundColor: "#f7f9f6", minHeight: "95vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" style={{ fontWeight: "bold", marginBottom: "8px" }}>
          Select your role
        </Typography>
        <Typography variant="body1" align="center" style={{ color: "#7d8a6a", marginBottom: "16px" }}>
          Welcome to <strong>MedSync</strong>, your integrated healthcare platform. Choose your role to
          access personalized features and services designed specifically for your needs.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper
              onClick={() => handleSelectRole("patient")}
              elevation={selectedRole === "patient" ? 4 : 1}
              style={{
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                border: selectedRole === "patient" ? "2px solid #3e4b32" : "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            >
              <img src={patientCareImage} alt="Patient Care" style={{ width: "100%", height: "auto", marginBottom: "12px" }} />
              <Typography variant="h6" style={{ color: "#3e4b32", fontWeight: selectedRole === "patient" ? "bold" : "normal" }}>
                Patient Care
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              onClick={() => handleSelectRole("healthcare")}
              elevation={selectedRole === "healthcare" ? 4 : 1}
              style={{
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                border: selectedRole === "healthcare" ? "2px solid #3e4b32" : "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            >
              <img src={healthcarePractitionerImage} alt="Healthcare Practitioner" style={{ width: "100%", height: "auto", marginBottom: "12px" }} />
              <Typography variant="h6" style={{ color: "#3e4b32", fontWeight: selectedRole === "healthcare" ? "bold" : "normal" }}>
                Healthcare Practitioner
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!selectedRole}
            style={{ backgroundColor: "#e3ebdc", color: "#3e4b32", fontWeight: "bold", padding: "12px 24px", borderRadius: "8px" }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
