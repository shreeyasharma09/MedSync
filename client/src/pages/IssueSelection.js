import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper } from '@mui/material';

export default function IssueSelection() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={1}
        sx={{ p: 4, mt: 5, textAlign: 'center', borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Is this a New or Existing issue?
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, bgcolor: '#3E4B32', '&:hover': { bgcolor: '#2f3b26' } }}
          onClick={() => navigate('/new-issue')}
        >
          New Issue
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ color: '#3E4B32', borderColor: '#3E4B32' }}
          onClick={() => navigate('/old-issues')}
        >
          Existing Issues
        </Button>
      </Paper>
    </Container>
  );
}
