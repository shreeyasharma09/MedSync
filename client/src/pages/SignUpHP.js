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
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FirebaseContext from '../components/Firebase/context'; // Import Firebase context

const hospitals = ['Hospital 1', 'Hospital 2', 'Hospital 3'];
const specialties = [
  'Emergency Medicine',
  'Intensive Care (Critical Care Medicine)',
  'Internal Medicine',
  'Cardiology',
  'Pulmonology',
  'Gastroenterology',
  'Nephrology',
  'Endocrinology',
  'Hematology',
  'Infectious Disease',
  'Rheumatology',
  'General Surgery',
  'Cardiothoracic Surgery',
  'Neurosurgery',
  'Orthopedic Surgery',
  'Plastic & Reconstructive Surgery',
  'Otolaryngology (ENT)',
  'Urology',
  'Vascular Surgery',
  'Obstetrics & Gynecology (OB/GYN)',
  'Pediatrics',
  'Neonatology',
  'Neurology',
  'Psychiatry',
  'Oncology',
  'Radiation Oncology',
  'Palliative Care',
  'Radiology',
  'Interventional Radiology',
  'Pathology',
  'Anesthesiology',
];

const SignupFormHP = () => {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext); // Access Firebase instance
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    mincNumber: '',
    dob: '',
    hospital: '',
    specialty: '',
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

  // Handle submit with FB
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
      setError(null);
  
      try {
        await firebase.doCreateUserWithEmailAndPassword(formValues.mincNumber, formValues.password);
        console.log("Healthcare Professional created successfully in Firebase!");
  
        const response = await fetch('/api/healthProfSignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            mincNumber: formValues.mincNumber,
            dob: formValues.dob,
            hospital: formValues.hospital,
            specialty: formValues.specialty,
            password: formValues.password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create account in backend');
        }
  
        console.log('Healthcare Professional registered successfully in backend!');
        navigate('/ConfirmationVerifyH');
      } catch (err) {
        setError(err.message); // Display error message
        console.error('Sign-up error:', err);
      } finally {
        setLoading(false); // Reset loading state
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
            style={{ color: '#3e4b32', fontWeight: '600' }}
            gutterBottom
          >
            Create your new <strong>Healthcare Professional</strong> account
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
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  placeholder="Enter your first name..."
                  value={formValues.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="mincNumber"
                  variant="outlined"
                  placeholder="Enter your email ..."
                  value={formValues.mincNumber}
                  onChange={handleChange}
                  error={!!errors.mincNumber}
                  helperText={errors.mincNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  variant="outlined"
                  //placeholder="MM/DD/YYYY"
                  type="date"
                  value={formValues.dob}
                  onChange={handleChange}
                  error={!!errors.dob}
                  helperText={errors.dob}
                  InputLabelProps={{ shrink:true }}
                  InputProps={{ style: { borderRadius: '8px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Hospital"
                  name="hospital"
                  variant="outlined"
                  value={formValues.hospital}
                  onChange={handleChange}
                  error={!!errors.hospital}
                  helperText={errors.hospital}
                >
                  {hospitals.map((hospital) => (
                    <MenuItem key={hospital} value={hospital}>
                      {hospital}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Specialty"
                  name="specialty"
                  variant="outlined"
                  value={formValues.specialty}
                  onChange={handleChange}
                  error={!!errors.specialty}
                  helperText={errors.specialty}
                >
                  {specialties.map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
                    </MenuItem>
                  ))}
                </TextField>
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
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: '2rem', paddingBottom: '1rem', color: '#7d8a6a' }}
          >
            Already have an account?{' '}
            <Link
              href="hp-signin"
              style={{
                color: '#3e4b32',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Log in to your healthcare professional account
            </Link>
            <br />
            <br />
            Are you a Patient?{' '}
            <Link
              href="SignUpPatient"
              style={{
                color: '#3e4b32',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Patient Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default SignupFormHP;