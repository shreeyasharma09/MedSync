import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Mock Data: a small list of upcoming appointments
const appointments = [
  {
    id: 1,
    doctor: 'Dr. Emily Johnson',
    date: '2023-06-15',
    time: '10:00 AM',
    issue: 'Annual checkup',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Lee',
    date: '2023-06-20',
    time: '2:00 PM',
    issue: 'Follow-up on test results',
  },
];

export default function BookingsPage() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        backgroundColor: '#f7f9f6',
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          bgcolor: '#CFD8C9',
          borderRadius: '50%',
          transform: 'translate(50%,-50%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 300,
          height: 300,
          bgcolor: '#E1E9D8',
          borderRadius: '50%',
          transform: 'translate(-50%,50%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{position: 'relative', zIndex: 1}}>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{fontWeight: 'bold', color: '#3e4b32'}}>
            Your Appointments
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#9AAE9A',
              '&:hover': {bgcolor: '#79886C'},
              borderRadius: '999px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            startIcon={<AddCircleOutlineIcon />}
          >
            New Appointment
          </Button>
        </Box>

        {appointments.length === 0 ? (
          <Card
            sx={{
              p: 4,
              textAlign: 'center',
              boxShadow: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CalendarMonthIcon sx={{fontSize: 64, color: '#79886C', mb: 2}} />
            <Typography variant="h6" sx={{color: '#3e4b32', mb: 1}}>
              No upcoming appointments
            </Typography>
            <Typography sx={{color: '#7d8a6a', mb: 2}}>
              Your schedule is clear. Need to book a visit?
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#9AAE9A',
                '&:hover': {bgcolor: '#79886C'},
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Schedule Now
            </Button>
          </Card>
        ) : (
          <Stack spacing={3}>
            {appointments.map(appt => (
              <Card
                key={appt.id}
                sx={{
                  p: 2,
                  boxShadow: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {boxShadow: 4},
                }}
              >
                <CardContent sx={{position: 'relative', zIndex: 1}}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                        <PersonIcon sx={{color: '#79886C', mr: 1}} />
                        <Typography
                          variant="subtitle1"
                          sx={{fontWeight: 600, color: '#3e4b32'}}
                        >
                          {appt.doctor}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 2,
                          mb: 1,
                          color: '#7d8a6a',
                        }}
                      >
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <CalendarMonthIcon sx={{fontSize: 18, mr: 0.5}} />
                          <Typography variant="body2">{appt.date}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <AccessTimeIcon sx={{fontSize: 18, mr: 0.5}} />
                          <Typography variant="body2">{appt.time}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                        Issue: {appt.issue}
                      </Typography>
                    </Box>

                    <Box>
                      <CardActions sx={{display: 'flex', gap: 1}}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{textTransform: 'none'}}
                          startIcon={<ClearIcon />}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: 'none',
                            color: '#ffa726',
                            borderColor: '#ffa726',
                            '&:hover': {
                              bgcolor: 'rgba(255, 167, 38, 0.08)',
                            },
                          }}
                          startIcon={<ChangeCircleIcon />}
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: 'none',
                            color: '#42a5f5',
                            borderColor: '#42a5f5',
                            '&:hover': {
                              bgcolor: 'rgba(66, 165, 245, 0.08)',
                            },
                          }}
                          startIcon={<ChatBubbleOutlineIcon />}
                          // onClick => contact logic
                        >
                          Contact
                        </Button>
                      </CardActions>
                    </Box>
                  </Box>
                </CardContent>

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    bgcolor: '#CFD8C9',
                    borderRadius: '50%',
                    transform: 'translate(50%,-50%)',
                    zIndex: 0,
                  }}
                />
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
