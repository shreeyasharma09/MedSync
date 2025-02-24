import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FirebaseContext from '../components/Firebase/context'; // Import Firebase context

const SignUpPatient = () => {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext); // Access Firebase instance
  const [formValues, setFormValues] = useState({
    healthCard: '',
    dob: '',
    firstName: '',
    lastName: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error messages

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};
    let hasErrors = false;
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = 'This field is required';
        hasErrors = true;
      }
    });
    setErrors(newErrors);

    if (!hasErrors) {
      setLoading(true);
      setError(null); // Reset error state

      try {
        // Create user with Firebase
        await firebase.doCreateUserWithEmailAndPassword(formValues.healthCard, formValues.password);
        console.log("User created successfully!");
        navigate('/Home'); // Redirect user to the home page after successful sign-up
      } catch (err) {
        setError(err.message); // Set error message
        console.error("Sign-up error:", err);
      } finally {
        setLoading(false); // Reset the loading state
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
            style={{ color: '#3e4b32', fontWeight: '600' }}
            gutterBottom
          >
            Create your new <strong>patient</strong> account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{ color: '#7d8a6a' }}
            gutterBottom
          >
            Please fill in your information to create your account
          </Typography>

          {error && ( // Display an error message
            <Typography color="error" align="center" style={{ marginBottom: '1rem' }}>
              {error}
            </Typography>
          )}

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="healthCard"
                  variant="outlined"
                  placeholder="Enter your email..."
                  value={formValues.healthCard}
                  onChange={handleChange}
                  error={!!errors.healthCard}
                  helperText={errors.healthCard}
                  InputProps={{ style: { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  variant="outlined"
                  placeholder="MM/DD/YYYY"
                  value={formValues.dob}
                  onChange={handleChange}
                  error={!!errors.dob}
                  helperText={errors.dob}
                  InputProps={{ style: { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  placeholder="Enter your first name..."
                  value={formValues.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{ style: { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  placeholder="Enter your last name..."
                  value={formValues.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  InputProps={{ style: { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  variant="outlined"
                  placeholder="Enter your full address..."
                  value={formValues.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  InputProps={{ style: { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    style: { borderRadius: '8px' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: '#e3ebdc',
                    color: '#3e4b32',
                    fontWeight: 'bold',
                    padding: '12px',
                    borderRadius: '8px',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
              </Grid>
            </Grid>
          </form>
          <br />
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '1rem', color: '#7d8a6a' }}
          >
            Already have an account?{' '}
            <Link
              href="p-signin"
              style={{
                color: '#3e4b32',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Log in to your patient account
            </Link>
            <br />
            <br />
            Are you a Healthcare Professional?{' '}
            <Link
              href="/SignUpHP"
              style={{
                color: '#3e4b32',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Healthcare Professional Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUpPatient;