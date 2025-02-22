import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileSelection = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f7f9f6"
    >
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Select an Option
      </Typography>

      <Box display="flex" gap={4}>
        {/* View and Update Profile */}
        <Paper
          component={Link}
          to="/profile/view-profile"
          elevation={2}
          sx={{
            p: 3,
            width: "250px",
            textAlign: "center",
            textDecoration: "none",
            bgcolor: "#d9e6da",
            cursor: "pointer",
            "&:hover": { bgcolor: "#c3d6c3" },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            View Profile & Update
          </Typography>
        </Paper>

        {/* View and Update Medical History */}
        <Paper
          component={Link}
          to="/profile/medical-history"
          elevation={2}
          sx={{
            p: 3,
            width: "250px",
            textAlign: "center",
            textDecoration: "none",
            bgcolor: "#d9e6da",
            cursor: "pointer",
            "&:hover": { bgcolor: "#c3d6c3" },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            View & Update Medical History
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfileSelection;
