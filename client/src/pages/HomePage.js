"use client";

import React from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppointmentsSection } from "./appointments-section";

export default function HomePage() {
  const userName = "Sarah Johnson";
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f9f6",
        py: 4,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          p: 3,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#3e4b32",
            mb: 1,
          }}
        >
          Welcome back, {userName}
        </Typography>
        <Typography variant="body1" sx={{ color: "#7d8a6a", mb: 3 }}>
          Manage your appointments and health information all in one place.
        </Typography>

        <Paper
          sx={{
            backgroundColor: "#E1E9D8",
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            mb: 4,
          }}
          elevation={0}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#3e4b32", mb: 1 }}
            >
              Need to see your doctor?
            </Typography>
            <Typography variant="body2" sx={{ color: "#7d8a6a" }}>
              Book your next appointment at your convenience.
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#3E4B32",
              "&:hover": { bgcolor: "#2f3b26" },
              borderRadius: 2,
            }}
            onClick={() => navigate("/issue-selection")}
          >
            Book Appointment
          </Button>
        </Paper>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#3e4b32", mb: 2 }}
        >
          Upcoming Appointments
        </Typography>

        <AppointmentsSection />
      </Container>
    </Box>
  );
}
