import React, {useState} from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

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

const initialAvailability = [
  {day: 'Monday', start: '09:00', end: '17:00'},
  {day: 'Tuesday', start: '09:00', end: '17:00'},
  {day: 'Wednesday', start: '09:00', end: '17:00'},
  {day: 'Thursday', start: '09:00', end: '17:00'},
  {day: 'Friday', start: '09:00', end: '15:00'},
];

export default function HealthcareBookings() {
  const [availability, setAvailability] = useState(initialAvailability);
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeTime = (index, field, value) => {
    const newAvail = [...availability];
    newAvail[index] = {...newAvail[index], [field]: value};
    setAvailability(newAvail);
  };

  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const handleSaveAvailability = () => {
    console.log('Saving availability: ', availability);
    setIsEditing(false);
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
          sx={{fontWeight: 'bold', color: '#3e4b32', mb: 2}}
        >
          Appointment Schedule
        </Typography>
        <Typography variant="body1" sx={{color: '#7d8a6a', mb: 3}}>
          View and manage upcoming patient appointments, as well as your own
          availability for booking.
        </Typography>

        <Typography
          variant="h6"
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
          <List disablePadding sx={{mb: 4}}>
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
                <Paper
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
                    <ListItemAvatar>
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
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{fontWeight: 'bold', color: '#3e4b32'}}
                        >
                          {appt.patientName}
                        </Typography>
                      }
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccessTimeIcon
                            sx={{fontSize: 16, color: '#7d8a6a'}}
                          />
                          <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                            {appt.time} &nbsp;•&nbsp; {appt.reason}
                          </Typography>
                        </Stack>
                      }
                    />
                  </Box>
                  <Chip
                    label={chipLabel}
                    sx={{
                      bgcolor: chipBg,
                      color: chipColor,
                      fontWeight: 'bold',
                    }}
                  />
                </Paper>
              );
            })}
          </List>
        )}

        <Typography
          variant="h6"
          sx={{fontWeight: 'bold', color: '#3e4b32', mb: 2}}
        >
          Manage My Availability
        </Typography>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
          }}
          elevation={0}
        >
          <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
            <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
              Weekly Schedule
            </Typography>
            {!isEditing ? (
              <IconButton onClick={handleToggleEdit} color="primary">
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleSaveAvailability} color="success">
                <SaveIcon />
              </IconButton>
            )}
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Day</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Start Time</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availability.map((slot, idx) => (
                <TableRow key={slot.day}>
                  <TableCell>{slot.day}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        type="time"
                        size="small"
                        value={slot.start}
                        onChange={e =>
                          handleChangeTime(idx, 'start', e.target.value)
                        }
                      />
                    ) : (
                      slot.start
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        type="time"
                        size="small"
                        value={slot.end}
                        onChange={e =>
                          handleChangeTime(idx, 'end', e.target.value)
                        }
                      />
                    ) : (
                      slot.end
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}
