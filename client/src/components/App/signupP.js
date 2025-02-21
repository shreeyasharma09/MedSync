import React, {useState} from 'react';
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
import {Visibility, VisibilityOff} from '@mui/icons-material';

const SignupFormP = () => {
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

  const handleChange = event => {
    setFormValues({...formValues, [event.target.name]: event.target.value});
    setErrors({...errors, [event.target.name]: ''});
  };

  const handleSubmit = event => {
    event.preventDefault();
    let newErrors = {};
    Object.keys(formValues).forEach(field => {
      if (!formValues[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
  };

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: '#f7f9f6',
        minHeight: '100vh',
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
            style={{color: '#3e4b32', fontWeight: '600'}}
            gutterBottom
          >
            Create your new <strong>patient</strong> account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{color: '#7d8a6a'}}
            gutterBottom
          >
            Please fill in your information to create your account
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Health Card Number"
                  name="healthCard"
                  variant="outlined"
                  placeholder="Enter your health card number..."
                  value={formValues.healthCard}
                  onChange={handleChange}
                  error={!!errors.healthCard}
                  helperText={errors.healthCard}
                  InputProps={{style: {borderRadius: '8px'}}}
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
                  InputProps={{style: {borderRadius: '8px'}}}
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
                  InputProps={{style: {borderRadius: '8px'}}}
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
                  InputProps={{style: {borderRadius: '8px'}}}
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
                  InputProps={{style: {borderRadius: '8px'}}}
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
                    style: {borderRadius: '8px'},
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
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
          <br />
          <Typography
            variant="body2"
            align="center"
            style={{marginTop: '1rem', color: '#7d8a6a'}}
          >
            Already have an account?{' '}
            <Link
              href="#"
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
              href="#"
              style={{
                color: '#3e4b32',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Healthcare Log in
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default SignupFormP;
