// src/pages/HealthcareDashboard.js

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useNavigate} from 'react-router-dom';

export default function HealthcareDashboard() {
  const navigate = useNavigate();

  const dailyAppointments = 3;
  const pendingMessages = 2;
  const newPatients = 1;

  const appointments = [
    {
      id: 1,
      patientName: 'Sarah Wilson',
      time: '09:00 AM',
      reason: 'Follow-up',
      status: 'Checked In',
      color: '#7e57c2',
    },
    {
      id: 2,
      patientName: 'Michael Brown',
      time: '10:30 AM',
      reason: 'New Patient',
      status: 'Scheduled',
      color: '#ef5350',
    },
    {
      id: 3,
      patientName: 'Jessica Lee',
      time: '01:00 PM',
      reason: 'Annual Checkup',
      status: 'Scheduled',
      color: '#42a5f5',
    },
    {
      id: 4,
      patientName: 'Robert Chen',
      time: '02:30 PM',
      reason: 'Lab Results',
      status: 'Scheduled',
      color: '#ef5350',
    },
  ];

  const goToSchedule = () => {
    navigate('/HealthcareBookings');
  };

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
          backgroundColor: '#fff',
          borderRadius: 2,
          p: 4,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{fontWeight: 'bold', color: '#3e4b32', mb: 1}}
        >
          Hello, Dr. Williams
        </Typography>
        <Typography variant="body1" sx={{color: '#7d8a6a', mb: 3}}>
          Welcome to your healthcare dashboard. Quickly review your daily stats
          and upcoming tasks below.
        </Typography>

        <Grid container spacing={3} sx={{mb: 4}}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                bgcolor: '#E1E9D8',
                borderRadius: 2,
              }}
              elevation={0}
            >
              <Typography variant="h6" sx={{color: '#3e4b32', mb: 1}}>
                Appointments Today
              </Typography>
              <Typography
                variant="h5"
                sx={{fontWeight: 'bold', color: '#3e4b32'}}
              >
                {dailyAppointments}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                bgcolor: '#E1E9D8',
                borderRadius: 2,
              }}
              elevation={0}
            >
              <Typography variant="h6" sx={{color: '#3e4b32', mb: 1}}>
                Unread Messages
              </Typography>
              <Typography
                variant="h5"
                sx={{fontWeight: 'bold', color: '#3e4b32'}}
              >
                {pendingMessages}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                bgcolor: '#E1E9D8',
                borderRadius: 2,
              }}
              elevation={0}
            >
              <Typography variant="h6" sx={{color: '#3e4b32', mb: 1}}>
                New Patients
              </Typography>
              <Typography
                variant="h5"
                sx={{fontWeight: 'bold', color: '#3e4b32'}}
              >
                {newPatients}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{display: 'flex', gap: 2, mb: 4}}>
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              bgcolor: '#3e4b32',
              '&:hover': {bgcolor: '#2f3b26'},
              borderRadius: 2,
            }}
            onClick={goToSchedule}
          >
            View Schedule
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#3e4b32',
              borderColor: '#3e4b32',
              '&:hover': {
                backgroundColor: '#e3ebdc',
                borderColor: '#3e4b32',
              },
              borderRadius: 2,
            }}
          >
            Check Messages
          </Button>
        </Box>

        <Typography
          variant="h5"
          sx={{fontWeight: 'bold', color: '#3e4b32', mb: 2}}
        >
          Upcoming Appointments
        </Typography>

        {appointments.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 2,
              border: '1px solid #d2d2d2',
            }}
            elevation={0}
          >
            <Typography sx={{color: '#7d8a6a', mb: 1}}>
              No scheduled appointments at this time.
            </Typography>
            <Typography variant="body2" sx={{color: '#9c9c9c'}}>
              New appointments will appear here.
            </Typography>
          </Paper>
        ) : (
          <List disablePadding>
            {appointments.map(appt => {
              const initials = appt.patientName
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase();

              let chipLabel = appt.status;
              let chipBg = '#d0dfc7';
              let chipColor = '#3e4b32';

              if (appt.status === 'Scheduled') {
                chipBg = '#dceeff';
                chipColor = '#1565c0';
              }

              return (
                <Box
                  key={appt.id}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Avatar
                      sx={{
                        bgcolor: appt.color || '#9AAE9A',
                        width: 48,
                        height: 48,
                        fontWeight: 'bold',
                      }}
                    >
                      {initials}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{fontWeight: 'bold', color: '#3e4b32'}}
                      >
                        {appt.patientName}
                      </Typography>
                      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                        <AccessTimeIcon sx={{fontSize: 16, color: '#7d8a6a'}} />
                        <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                          {appt.time} &nbsp; • &nbsp; {appt.reason}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip
                    label={chipLabel}
                    sx={{
                      bgcolor: chipBg,
                      color: chipColor,
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              );
            })}
          </List>
        )}
      </Container>
    </Box>
  );
}
