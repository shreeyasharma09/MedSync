import React, {useState} from 'react';
import {Box, Typography, Paper, TextField, Button} from '@mui/material';

export default function PatientProfile() {
  // Dummy profile data (Replace with API call)
  const [profile, setProfile] = useState({
    healthCardNumber: '1234-567-890-AB',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, Anytown, AN 12345',
    phoneNumber: '(555) 123-4567',
    email: 'sarah.johnson@example.com',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = e => {
    setEditedProfile({...editedProfile, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ''}); // Clear errors when typing
  };

  // Save changes with validation
  const handleSave = () => {
    let newErrors = {};
    Object.keys(editedProfile).forEach(field => {
      if (!editedProfile[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProfile(editedProfile);
    setIsEditing(false);
  };

  // List of fields to display
  const fields = [
    {label: 'Health Card Number', name: 'healthCardNumber'},
    {label: 'First Name', name: 'firstName'},
    {label: 'Last Name', name: 'lastName'},
    {label: 'Date of Birth', name: 'dateOfBirth'},
    {label: 'Address', name: 'address'},
    {label: 'Phone Number', name: 'phoneNumber'},
    {label: 'Email Address', name: 'email'},
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f7f9f6',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      {/* Decorative background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          bgcolor: '#CFD8C9',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 250,
          height: 250,
          bgcolor: '#d9e6da',
          borderRadius: '50%',
          transform: 'translate(-50%, 50%)',
          zIndex: 0,
        }}
      />

      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          borderRadius: 2,
          position: 'relative',
          zIndex: 1,
          bgcolor: '#fff',
          border: '1px solid #b0b8a6',
        }}
      >
        <Typography
          variant="h5"
          sx={{fontWeight: 'bold', color: '#3e4b32', mb: 3}}
        >
          Your Profile
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          {fields.map((field, idx) => (
            <Box key={idx}>
              <Typography sx={{fontWeight: 'bold', color: '#3e4b32', mb: 0.5}}>
                {field.label}
              </Typography>
              <TextField
                name={field.name}
                value={
                  isEditing ? editedProfile[field.name] : profile[field.name]
                }
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    // Default border
                    '& fieldset': {borderColor: '#3e4b32'},
                    // Hover border
                    '&:hover fieldset': {borderColor: '#79886C'},
                    // Focused border
                    '&.Mui-focused fieldset': {borderColor: '#79886C'},
                  },
                  input: {
                    borderRadius: 1,
                    bgcolor: 'white',
                  },
                }}
              />
            </Box>
          ))}

          <Box sx={{display: 'flex', justifyContent: 'flex-start', mt: 2}}>
            <Button
              variant="contained"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              sx={{
                bgcolor: '#9AAE9A',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#79886C',
                },
              }}
            >
              {isEditing ? 'Save Changes' : 'Update Information'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
