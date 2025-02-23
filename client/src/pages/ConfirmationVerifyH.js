import React from 'react';
import {Container, Typography, Button, Paper, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ConfirmationVerifyH = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: '#f7f9f6',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{
            padding: '2rem',
            textAlign: 'center',
            borderRadius: '8px',
            boxShadow: 'none',
          }}
        >
          <Typography
            variant="h4"
            style={{color: '#3e4b32', fontWeight: 'bold'}}
            gutterBottom
          >
            Success!
          </Typography>
          <Typography variant="body1" style={{color: '#7d8a6a'}} gutterBottom>
            You are now a healthcare professional with MedSync.
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={() => navigate('/HomeH')}
              style={{
                backgroundColor: '#e3ebdc',
                color: '#3e4b32',
                fontWeight: 'bold',
                marginRight: '1rem',
              }}
            >
              Go to Home
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/Profile')}
              style={{
                backgroundColor: '#e3ebdc',
                color: '#3e4b32',
                fontWeight: 'bold',
              }}
            >
              Go to Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ConfirmationVerifyH;
