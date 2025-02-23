import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { TextField, Checkbox, FormControlLabel, Button, Typography, Grid, Link, Box, Paper, Container } from '@mui/material'

function SignInFormP() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    healthCard: "",
    password: "",
    rememberMe: false,
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      console.log("Form submitted:", formData)
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

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
            Welcome Back!
          </Typography>
          <Typography
            variant="body2"
            align="center"
            style={{ color: '#7d8a6a', marginBottom: '1rem' }}
          >
            Enter your health card number and password to access your account.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Health Card Number"
                  type="text"
                  name="healthCard"
                  fullWidth
                  value={formData.healthCard}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={!!formData.healthCard && formData.healthCard.length < 1}
                  helperText={formData.healthCard.length < 1 && "This field is required"}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={!!formData.password && formData.password.length < 1}
                  helperText={formData.password.length < 1 && "This field is required"}
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
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Box mt={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="body2" style={{ color: '#7d8a6a' }}>Don't have an account?</Typography>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigate('/SignUpPatient')
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
  )
}

export default SignInFormP
