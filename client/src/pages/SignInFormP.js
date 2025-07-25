import {useState, useContext} from 'react';
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
  Paper,
  Container,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import FirebaseContext from '../components/Firebase/context'; // Import Firebase context

function SignInFormP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // new password visibility
  const [formData, setFormData] = useState({
    healthCard: '',
    password: '',
    rememberMe: false,
  });

  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext); // Access Firebase instance

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Sign in with Firebase
      await firebase.doSignInWithEmailAndPassword(
        formData.healthCard,
        formData.password,
      );
      console.log('User signed in successfully!');
      localStorage.setItem('userRole', 'patient');
      navigate('/profile/p'); // Redirect user to the main dashboard after successful sign-in
    } catch (err) {
      setError(err.message); // Set error message
      console.error('Sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const {name, value, type, checked} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: '#f7f9f6',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2rem',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={1}
          style={{
            padding: '2rem',
            width: '100%',
            border: '1px solid #b0b8a6',
            borderRadius: '8px',
            boxShadow: 'none',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            style={{color: '#3e4b32', fontWeight: '600'}}
            gutterBottom
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{color: '#7d8a6a', marginBottom: '1rem'}}
          >
            Enter your email and password to access your account.
          </Typography>

          {error && ( // Display an error message
            <Typography
              color="error"
              align="center"
              style={{marginBottom: '1rem'}}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="text"
                  name="healthCard"
                  fullWidth
                  value={formData.healthCard}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={
                    !!formData.healthCard && formData.healthCard.length < 1
                  }
                  helperText={
                    formData.healthCard.length < 1 && 'This field is required'
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={!!formData.password && formData.password.length < 1}
                  helperText={
                    formData.password.length < 1 && 'This field is required'
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                    backgroundColor: '#e3ebdc',
                    color: '#3e4b32',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#7A9A7E',
                    },
                    padding: '12px',
                    borderRadius: '8px',
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
            <Typography variant="body2" style={{color: '#7d8a6a'}}>
              Don't have an account?
            </Typography>
            <Link
              href="#"
              onClick={e => {
                e.preventDefault();
                navigate('/SignUpPatient');
              }}
              style={{
                color: '#3e4b32',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Create an account
            </Link>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default SignInFormP;
