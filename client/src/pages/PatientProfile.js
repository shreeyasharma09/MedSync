import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

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
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  // Save changes with validation
  const handleSave = () => {
    let newErrors = {};
    Object.keys(editedProfile).forEach((field) => {
      if (!editedProfile[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProfile(editedProfile);
    setIsEditing(false);
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

        {/* Profile Fields with Labels Outside */}
        <Box display="flex" flexDirection="column" gap={2}>
          {[
            { label: "Health Card Number", name: "healthCardNumber" },
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Date of Birth", name: "dateOfBirth" },
            { label: "Address", name: "address" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Email Address", name: "email" },
          ].map((field, index) => (
            <Box key={index}>
              <Typography fontWeight="bold">{field.label}</Typography>
              <TextField
                name={field.name}
                value={isEditing ? editedProfile[field.name] : profile[field.name]}
                onChange={handleChange}
                disabled={!isEditing}
                fullWidth
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3e4b32" }, // Default border
                    "&:hover fieldset": { borderColor: "#738A6E" }, // Moss green on hover
                    "&.Mui-focused fieldset": { borderColor: "#738A6E" }, // Moss green when focused
                  },
                  input: {
                    borderRadius: "5px",
                    padding: "10px",
                    bgcolor: "white",
                  },
                }}
              />
            </Box>
          ))}

          {/* Update Information Button */}
          <Box display="flex" justifyContent="flex-start" mt={2}>
            <Button
              variant="contained"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              sx={{
                bgcolor: "#344c3D",
                color: "white",
                "&:hover": { bgcolor: "#344c3D" },
              }}
            >
              {isEditing ? "Save Changes" : "Update Information"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientProfile;

