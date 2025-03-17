'use client';

import {useState} from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputLabel,
  Grid,
} from '@mui/material';
import {CalendarMonth, AccessTime, Edit, Delete} from '@mui/icons-material';
import {format, parse} from 'date-fns';
import {updateAppointment, deleteAppointment} from './appointment-actions';

export function AppointmentCard({appointment, onUpdate}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: appointment.date,
    time: appointment.time,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format the date for display
  const displayDate = () => {
    try {
      const parsedDate = parse(appointment.date, 'dd-MM-yyyy', new Date());
      return format(parsedDate, 'MMMM d, yyyy');
    } catch (error) {
      return appointment.date;
    }
  };

  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      await updateAppointment({
        id: appointment.id,
        date: formData.date,
        time: formData.time,
      });
      setIsEditOpen(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteAppointment(appointment.id);
      setIsDeleteOpen(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: 3,
          },
        }}
        onClick={() => setIsEditOpen(true)}
      >
        <CardContent sx={{padding: 2.5}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography variant="h6" sx={{fontWeight: 600, color: '#3e4b32'}}>
                {appointment.doctorName}
              </Typography>
              <Typography variant="body2" sx={{color: '#7d8a6a'}}>
                {appointment.specialty}
              </Typography>
            </Box>
          </Box>
          <Box sx={{mt: 2, display: 'flex', flexDirection: 'column', gap: 1}}>
            <Box sx={{display: 'flex', alignItems: 'center', color: '#7d8a6a'}}>
              <CalendarMonth sx={{fontSize: 16, mr: 1}} />
              <Typography variant="body2">{displayDate()}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', color: '#7d8a6a'}}>
              <AccessTime sx={{fontSize: 16, mr: 1}} />
              <Typography variant="body2">{appointment.time}</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            bgcolor: '#f7f9f6',
            padding: 1.5,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<Edit sx={{fontSize: 16}} />}
            sx={{
              color: '#3e4b32',
              borderColor: '#3e4b32',
              '&:hover': {
                borderColor: '#3e4b32',
                backgroundColor: 'rgba(62, 75, 50, 0.04)',
              },
            }}
            onClick={e => {
              e.stopPropagation();
              setIsEditOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Delete sx={{fontSize: 16}} />}
            sx={{
              color: '#d32f2f',
              borderColor: '#d32f2f',
              '&:hover': {
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.04)',
              },
            }}
            onClick={e => {
              e.stopPropagation();
              setIsDeleteOpen(true);
            }}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>

      {/* Edit Appointment Dialog */}
      <Dialog
        open={isEditOpen}
        onClose={handleCloseEditDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{mt: 1}}>
            <Grid item xs={12}>
              <InputLabel htmlFor="date" sx={{mb: 1}}>
                Date
              </InputLabel>
              <TextField
                id="date"
                name="date"
                fullWidth
                placeholder="DD-MM-YYYY"
                value={formData.date}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="time" sx={{mb: 1}}>
                Time
              </InputLabel>
              <TextField
                id="time"
                name="time"
                fullWidth
                placeholder="00:00"
                value={formData.time}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isSubmitting}
            sx={{
              bgcolor: '#3E4B32',
              color: 'white',
              '&:hover': {
                bgcolor: '#2f3b26',
              },
              '&.Mui-disabled': {
                bgcolor: '#3E4B32',
                opacity: 0.7,
                color: 'white',
              },
            }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="inherit">
            No, Keep It
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isSubmitting}
            sx={{
              bgcolor: '#d32f2f',
              color: 'white',
              '&:hover': {
                bgcolor: '#b71c1c',
              },
              '&.Mui-disabled': {
                bgcolor: '#d32f2f',
                opacity: 0.7,
                color: 'white',
              },
            }}
          >
            {isSubmitting ? 'Cancelling...' : 'Yes, Cancel It'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
