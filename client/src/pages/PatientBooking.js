import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Stack,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const availability = [
  { day: 'Monday', start: '09:00', end: '17:00' },
  { day: 'Tuesday', start: '10:00', end: '16:00' },
  { day: 'Wednesday', start: '09:00', end: '15:00' },
  { day: 'Thursday', start: '11:00', end: '17:00' },
  // Friday unavailable
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const generateTimeSlots = (start, end) => {
  const slots = [];
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);
  let current = new Date(0, 0, 0, startHour, startMin);
  const endTime = new Date(0, 0, 0, endHour, endMin);

  while (current < endTime) {
    const next = new Date(current.getTime() + 30 * 60000);
    const format = (d) => d.toTimeString().slice(0, 5);
    slots.push(`${format(current)} - ${format(next)}`);
    current = next;
  }

  return slots;
};

const PatientBookings = () => {
  const query = useQuery();
  const patient_id = query.get('patient_id');
  const issue_id = query.get('issue_id');
  const issue = query.get('issue');
  const specialty = query.get('specialty');
  const hosp_id = query.get('hosp_id');

  const [experts, setExperts] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get('/api/experts', {
          params: { hosp_id, issue_id, patient_id }
        });
        setExperts(res.data);
      } catch (err) {
        console.error('Failed to fetch experts:', err);
      }
    };

    if (hosp_id && issue_id && patient_id) {
      fetchExperts();
    }
  }, [hosp_id, issue_id, patient_id]);

  const handleToggle = (day) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  const handleBookSlot = (day, time, expert) => {
    alert(`Booked ${time} on ${day} with Dr. ${expert.first_name} ${expert.last_name}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3e4b32', mb: 3 }}>
        Book Appointment
      </Typography>

      {experts.length > 0 ? (
        experts.map((expert, index) => (
          <Box key={index} sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', gap: 4 }}>
              {/* Expert Info */}
              <Card sx={{ minWidth: 250, bgcolor: '#F5F7F2', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Stack alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#3e4b32', width: 64, height: 64 }}>
                      <MedicalInformationIcon sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Dr. {expert.first_name} {expert.last_name}
                    </Typography>
                    <Chip label={expert.specialty} color="success" variant="outlined" />
                  </Stack>
                </CardContent>
              </Card>

              {/* Weekly Availability Table */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Weekly Availability
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Start Time</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>End Time</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {daysOfWeek.map((day) => {
                      const slot = availability.find((a) => a.day === day);
                      const isExpanded = expandedDay === day;

                      return (
                        <React.Fragment key={day}>
                          <TableRow>
                            <TableCell>{day}</TableCell>
                            <TableCell>{slot ? slot.start : '--'}</TableCell>
                            <TableCell>{slot ? slot.end : '--'}</TableCell>
                            <TableCell>
                              {slot ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    textTransform: 'none',
                                    bgcolor: '#3e4b32',
                                    '&:hover': { bgcolor: '#2f3b26' },
                                  }}
                                  onClick={() => handleToggle(day)}
                                >
                                  {isExpanded ? 'Hide slots' : 'Find a time slot'}
                                </Button>
                              ) : (
                                <Chip label="Unavailable" color="default" size="small" />
                              )}
                            </TableCell>
                          </TableRow>

                          {isExpanded && slot && (
                            <TableRow>
                              <TableCell colSpan={4} sx={{ pl: 4 }}>
                                <Collapse in={isExpanded}>
                                  <List dense>
                                    {generateTimeSlots(slot.start, slot.end).map((timeSlot) => (
                                      <ListItem
                                        key={timeSlot}
                                        sx={{
                                          py: 0.5,
                                          px: 0,
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <ListItemText primary={timeSlot} />
                                        <Button
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            textTransform: 'none',
                                            color: '#3e4b32',
                                            borderColor: '#3e4b32',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                              backgroundColor: '#f1f5ef',
                                              borderColor: '#f1f5ef',
                                            },
                                          }}
                                          onClick={() => handleBookSlot(day, timeSlot, expert)}
                                        >
                                          Book
                                        </Button>
                                      </ListItem>
                                    ))}
                                  </List>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No experts available at this time.
        </Typography>
      )}
    </Container>
  );
};

export default PatientBookings;


