import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PatientProfile = () => {
  // Dummy profile data (Replace with API call)
  const [profile, setProfile] = useState({
    healthCardNumber: "1234-567-890-AB",
    firstName: "Sarah",
    lastName: "Johnson",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, Anytown, AN 12345",
    phoneNumber: "(555) 123-4567",
    email: "sarah.johnson@example.com",
    password: "Default@123",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Open confirmation dialog before saving
  const handleSaveClick = () => {
    let newErrors = {};
    Object.keys(editedProfile).forEach((field) => {
      if (!editedProfile[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop the process if there are errors
    }

    setConfirmDialogOpen(true);
  };

  // Confirm and save changes
  const handleConfirmSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setConfirmDialogOpen(false);
    setSuccessMessageOpen(true); // Show success message
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f9f6",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          borderRadius: 2,
          position: "relative",
          zIndex: 1,
          bgcolor: "#fff",
          border: "1px solid #b0b8a6",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3e4b32", mb: 3 }}>
          Your Profile
        </Typography>

        <Box display="flex" gap={2}>
          {["firstName", "lastName"].map((field, index) => (
            <Box key={index} flex={1}>
              <Typography fontWeight="bold">
                {field === "firstName" ? "First Name" : "Last Name"}
              </Typography>
              <TextField
                name={field}
                value={isEditing ? editedProfile[field] : profile[field]}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                error={!!errors[field]}
                helperText={errors[field]}
              />
            </Box>
          ))}
        </Box>

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {[
            { label: "Health Card Number", name: "healthCardNumber" },
            { label: "Date of Birth", name: "dateOfBirth" },
            { label: "Address", name: "address" },
            { label: "Email Address", name: "email" },
          ].map((field, index) => (
            <Box key={index}>
              <Typography fontWeight="bold">{field.label}</Typography>
              <TextField
                name={field.name}
                value={isEditing ? editedProfile[field.name] : profile[field.name]}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
              />
            </Box>
          ))}

          <Box>
            <Typography fontWeight="bold">Password</Typography>
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={isEditing ? editedProfile.password : profile.password}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end" aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box display="flex" justifyContent="flex-start" mt={2}>
            <Button
              variant="contained"
              onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}
              sx={{
                bgcolor: "#9AAE9A",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#79886C" },
              }}
            >
              {isEditing ? "Save Changes" : "Update Information"}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to save these changes?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmSave} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessMessageOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientProfile;


