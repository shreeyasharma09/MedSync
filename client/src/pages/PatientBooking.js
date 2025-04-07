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

const getNextWeekDate = (day) => {
  const dayIndex = daysOfWeek.indexOf(day);
  const today = new Date();
  const nextMonday = new Date(today.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7)));
  const target = new Date(nextMonday);
  target.setDate(nextMonday.getDate() + dayIndex);
  return target.toISOString().slice(0, 10);
};

const isSlotBooked = (bookedSlots, expertId, day, timeSlot) => {
  const key = `${expertId}-${day}`;
  return bookedSlots?.[key]?.includes(timeSlot);
};

const PatientBookings = () => {
  const query = useQuery();
  const patient_id = query.get('patient_id');
  const issue_id = query.get('issue_id');
  const hosp_id = query.get('hosp_id');

  const [experts, setExperts] = useState([]);
  const [expertAvailability, setExpertAvailability] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);
  const [dynamicBookedSlots, setDynamicBookedSlots] = useState({});

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axios.get('/api/experts', {
          params: { hosp_id, issue_id, patient_id },
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

  useEffect(() => {
    const fetchAvailabilityForExperts = async () => {
      const availabilityMap = {};
      for (const expert of experts) {
        try {
          const res = await axios.get(`/api/availability/${expert.id}`);
          const availability = res.data.map(slot => ({
            day: slot.day,
            start: slot.start_time?.slice(0, 5) || '',
            end: slot.end_time?.slice(0, 5) || '',
            is_available: slot.is_available,
          }));
          availabilityMap[expert.id] = availability;
        } catch (err) {
          console.error(`Error fetching availability for expert ${expert.id}:`, err);
        }
      }
      setExpertAvailability(availabilityMap);
    };

    if (experts.length > 0) {
      fetchAvailabilityForExperts();
    }
  }, [experts]);

  const fetchBookedSlotsForDay = async (expertId, day, date, slots) => {
    try {
      const res = await axios.post('/api/check-booked-slots', {
        hp_id: expertId,
        day,
        date,
        slots,
      });

      const key = `${expertId}-${day}`;
      setDynamicBookedSlots(prev => ({
        ...prev,
        [key]: res.data.booked,
      }));
    } catch (err) {
      console.error('Failed to fetch booked slots:', err);
    }
  };

  const handleToggle = async (day, expert) => {
    const key = `${expert.id}-${day}`;
    const isExpanded = expandedDay === key;

    if (!isExpanded && !(key in dynamicBookedSlots)) {
      const availability = expertAvailability[expert.id] || [];
      const slot = availability.find(a => a.day === day && a.is_available);
      if (!slot) return;

      const timeSlots = generateTimeSlots(slot.start, slot.end);
      const date = getNextWeekDate(day);

      await fetchBookedSlotsForDay(expert.id, day, date, timeSlots);
    }

    setExpandedDay(prev => (prev === key ? null : key));
  };

  const handleBookSlot = async (day, timeSlot, expert) => {
    const date = getNextWeekDate(day);

    try {
      await axios.post('/api/bookings', {
        hp_id: expert.id,
        issue_id,
        patient_id,
        day,
        slot: timeSlot,
        date,
      });

      alert(`Successfully booked ${timeSlot} on ${day} with Dr. ${expert.first_name} ${expert.last_name}`);

      const availability = expertAvailability[expert.id] || [];
      const slotInfo = availability.find(a => a.day === day && a.is_available);
      if (!slotInfo) return;

      const timeSlots = generateTimeSlots(slotInfo.start, slotInfo.end);
      await fetchBookedSlotsForDay(expert.id, day, date, timeSlots);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Something went wrong while booking.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3e4b32', mb: 3 }}>
        Book Appointment
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
        You can only book appointments for the upcoming week.
      </Typography>

      {experts.length > 0 ? (
        experts.map((expert) => {
          const availability = expertAvailability[expert.id] || [];

          return (
            <Box key={expert.id} sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
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
                      {daysOfWeek.map(day => {
                        const slot = availability.find(a => a.day === day && a.is_available);
                        const key = `${expert.id}-${day}`;
                        const isExpanded = expandedDay === key;

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
                                    onClick={() => handleToggle(day, expert)}
                                  >
                                    {isExpanded ? 'Hide slots' : 'Find a time slot'}
                                  </Button>
                                ) : (
                                  <Chip label="Unavailable" size="small" />
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
                                            disabled={isSlotBooked(dynamicBookedSlots, expert.id, day, timeSlot)}
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
                                            {isSlotBooked(dynamicBookedSlots, expert.id, day, timeSlot)
                                              ? 'Booked'
                                              : 'Book'}
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
          );
        })
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No experts available at this time.
        </Typography>
      )}
    </Container>
  );
};

export default PatientBookings;

