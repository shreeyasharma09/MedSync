import React, {useState} from 'react';
import {Container, Typography, Grid, Paper, Button, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const patientCareImage = '/assets/patient-care.png';
  const healthcarePractitionerImage = '/assets/healthcare-practitioner.png';

  const handleSelectRole = role => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole === 'patient') {
      navigate('/p-signin');
    } else if (selectedRole === 'healthcare') {
      navigate('/hp-signin');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#f7f9f6',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{fontWeight: 'bold', mb: 1}}
        >
          Select your role
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{color: '#7d8a6a', mb: 3}}
        >
          Welcome to <strong>MedSync</strong>, your integrated healthcare
          platform. Choose your role to access personalized features and
          services designed specifically for your needs.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Patient Care Card */}
          <Grid item xs={12} sm={6}>
            <Paper
              onClick={() => handleSelectRole('patient')}
              elevation={selectedRole === 'patient' ? 4 : 1}
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                border:
                  selectedRole === 'patient'
                    ? '2px solid #3e4b32'
                    : '1px solid #e0e0e0',
                borderRadius: 2,
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Box
                component="img"
                src={patientCareImage}
                alt="Patient Care"
                sx={{
                  width: '100%',
                  height: 'auto',
                  mb: 2,
                  maxHeight: 250, // keep a nice size
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: '#3e4b32',
                  fontWeight: selectedRole === 'patient' ? 'bold' : 'normal',
                }}
              >
                Patient Care
              </Typography>
            </Paper>
          </Grid>

          {/* Healthcare Practitioner Card */}
          <Grid item xs={12} sm={6}>
            <Paper
              onClick={() => handleSelectRole('healthcare')}
              elevation={selectedRole === 'healthcare' ? 4 : 1}
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                border:
                  selectedRole === 'healthcare'
                    ? '2px solid #3e4b32'
                    : '1px solid #e0e0e0',
                borderRadius: 2,
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Box
                component="img"
                src={healthcarePractitionerImage}
                alt="Healthcare Practitioner"
                sx={{
                  width: '100%',
                  height: 'auto',
                  mb: 2,
                  maxHeight: 250,
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: '#3e4b32',
                  fontWeight: selectedRole === 'healthcare' ? 'bold' : 'normal',
                }}
              >
                Healthcare Practitioner
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* NEXT Button */}
        <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!selectedRole}
            sx={{
              bgcolor: '#e3ebdc',
              color: '#3e4b32',
              fontWeight: 'bold',
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#d0dfc7',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
