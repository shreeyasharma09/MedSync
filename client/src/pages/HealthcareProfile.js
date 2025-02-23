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
  Autocomplete
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Predefined hospitals and specialties
const hospitals = ["Hospital 1", "Hospital 2", "Hospital 3"];
const specialties = [
  "Emergency Medicine", "Intensive Care (Critical Care Medicine)", "Internal Medicine", "Cardiology", "Pulmonology", 
  "Gastroenterology", "Nephrology", "Endocrinology", "Hematology", "Infectious Disease", "Rheumatology", "General Surgery", 
  "Cardiothoracic Surgery", "Neurosurgery", "Orthopedic Surgery", "Plastic & Reconstructive Surgery", "Otolaryngology (ENT)", 
  "Urology", "Vascular Surgery", "Obstetrics & Gynecology (OB/GYN)", "Pediatrics", "Neonatology", "Neurology", "Psychiatry", 
  "Oncology", "Radiation Oncology", "Palliative Care", "Radiology", "Interventional Radiology", "Pathology", "Anesthesiology"
];

const HpProfile = () => {
  // Dummy profile data (Replace with API call)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    mincNumber: "CAMD-1234-5679",
    hospital: "Hospital 1",
    specialty: "Cardiology",
    password: "Default@123"
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

  // Handle dropdown changes
  const handleDropdownChange = (name, value) => {
    setEditedProfile({ ...editedProfile, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Open confirmation dialog before saving
  const handleSaveClick = () => {
    setConfirmDialogOpen(true);
  };

  // Confirm and save changes
  const handleConfirmSave = () => {
    let newErrors = {};
    Object.keys(editedProfile).forEach((field) => {
      if (!editedProfile[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setConfirmDialogOpen(false);
      return;
    }

    setProfile(editedProfile);
    setIsEditing(false);
    setConfirmDialogOpen(false);
    setSuccessMessageOpen(true);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f7f9f6">
      <Paper
        elevation={1}
        sx={{
          p: "2rem",
          width: "100%",
          maxWidth: "600px",
          bgcolor: "#f7f9f6",
          border: "1px solid #b0b8a6",
          borderRadius: "8px",
          boxShadow: "none",
        }}
      >
        
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Your Profile
        </Typography>

        {/* First Name & Last Name */}
        <Box display="flex" gap={2}>
          {["firstName", "lastName"].map((field, index) => (
            <Box key={index} flex={1}>
              <Typography fontWeight="bold">{field === "firstName" ? "First Name" : "Last Name"}</Typography>
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

        {/* MINC Number */}
        <Box mt={2}>
          <Typography fontWeight="bold">MINC Number</Typography>
          <TextField
            name="mincNumber"
            value={isEditing ? editedProfile.mincNumber : profile.mincNumber}
            onChange={handleChange}
            disabled={!isEditing}
            fullWidth
            error={!!errors.mincNumber}
            helperText={errors.mincNumber}
          />
        </Box>

        {/* Hospital Selection */}
        <Box mt={2}>
          <Typography fontWeight="bold">Hospital</Typography>
          {isEditing ? (
            <Autocomplete
              freeSolo
              options={hospitals}
              value={editedProfile.hospital}
              onChange={(event, newValue) => handleDropdownChange("hospital", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="hospital"
                  fullWidth
                  error={!!errors.hospital}
                  helperText={errors.hospital}
                />
              )}
            />
          ) : (
            <TextField
              name="hospital"
              value={profile.hospital}
              fullWidth
              disabled
            />
          )}
        </Box>

        {/* Specialty Selection */}
        <Box mt={2}>
          <Typography fontWeight="bold">Specialty</Typography>
          {isEditing ? (
            <Autocomplete
              options={specialties}
              value={editedProfile.specialty}
              onChange={(event, newValue) => handleDropdownChange("specialty", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="specialty"
                  fullWidth
                  error={!!errors.specialty}
                  helperText={errors.specialty}
                />
              )}
            />
          ) : (
            <TextField
              name="specialty"
              value={profile.specialty}
              fullWidth
              disabled
            />
          )}
        </Box>

        

                {/* Password Field */}
                <Box mt={2}>
                  <Typography fontWeight="bold">Password</Typography>
                  <TextField
                    name="password"
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
                          <IconButton onClick={handleTogglePassword} edge="end">
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
              bgcolor: "#344c3D",
              color: "white",
              "&:hover": { bgcolor: "#344c3D" },
            }}
          >
            {isEditing ? "Save Changes" : "Update Information"}
          </Button>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to save the changes to your profile?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmSave} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HpProfile;

    
    
    