import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Link,
  Box,
} from '@mui/material';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    healthCard: '',
    password: '',
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Form submitted:', formData);
    }, 1000);
  };

  const handleChange = e => {
    const {name, value, type, checked} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="login-form-container">
      <div className="form-header">
        <Typography variant="h4">Welcome Back!</Typography>
        <Typography variant="body1">
          Enter your health card number and password to access your account
        </Typography>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Health Card Number" // Label above the input
              type="text"
              name="healthCard"
              fullWidth
              value={formData.healthCard}
              onChange={handleChange}
              required
              variant="outlined" // Add variant for better styling
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password" // Label above the input
              type="password"
              name="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined" // Add variant for better styling
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8FBC8F', // Sage green color
                '&:hover': {
                  backgroundColor: '#7A9A7E', // Darker sage green on hover
                },
              }}
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="body2">Don't have an account?</Typography>
        <Link
          href="#"
          onClick={e => {
            e.preventDefault();
            navigate('/p-signup');
          }}
          color="#8FBC8F"
        >
          Create an account
        </Link>
      </Box>
    </div>
  );
}

export default LoginForm;
