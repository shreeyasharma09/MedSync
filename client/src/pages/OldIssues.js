import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

export default function OldIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const patient_id = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(`/api/issues/${patient_id}`);
        if (!response.ok) throw new Error('Failed to fetch issues');
        const data = await response.json();
        setIssues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f7f9f6',
        py: 4,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          p: 3,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#3e4b32',
            mb: 2,
          }}
        >
          Your Previous Issues
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : issues.length === 0 ? (
          <Typography>No previous issues found.</Typography>
        ) : (
          issues.map(issue => (
            <Paper
              key={issue.issue_id}
              sx={{
                p: 3,
                mb: 2,
                backgroundColor: '#E1E9D8',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {backgroundColor: '#d4e0c6'},
              }}
              onClick={() => navigate(`/hospital-search?patient_id=${patient_id}&issue_id=${issue.issue_id}&specialty=${encodeURIComponent(issue.specialty)}&issue=${encodeURIComponent(issue.issue)}`)
            }
            >
              <Typography
                variant="h6"
                sx={{fontWeight: 'bold', color: '#3e4b32'}}
              >
                {issue.issue}
              </Typography>
              <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                <strong>Severity:</strong> {issue.severity}/10
              </Typography>
              <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                <strong>Specialty:</strong> {issue.specialty}
              </Typography>
              <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                <strong>Details:</strong> {issue.details}
              </Typography>
              <Typography variant="body2" sx={{color: '#9c9c9c', mt: 1}}>
                <strong>Created On:</strong>{' '}
                {new Date(issue.created_at).toLocaleString()}
              </Typography>
            </Paper>
          ))
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            bgcolor: '#3E4B32',
            '&:hover': {bgcolor: '#2f3b26'},
            borderRadius: 2,
            mt: 3,
          }}
          onClick={() => navigate('/new-issue')}
        >
          Submit a New Issue
        </Button>
      </Container>
    </Box>
  );
}
