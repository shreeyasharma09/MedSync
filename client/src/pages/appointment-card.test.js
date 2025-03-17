import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppointmentCard } from './appointment-card';
import { updateAppointment, deleteAppointment } from './appointment-actions';

// Mock the appointment actions
jest.mock('./appointment-actions', () => ({
  updateAppointment: jest.fn().mockResolvedValue({ success: true }),
  deleteAppointment: jest.fn().mockResolvedValue({ success: true }),
}));

describe('AppointmentCard Component', () => {
  const mockAppointment = {
    id: 1,
    doctorName: 'Dr. Emily Chen',
    specialty: 'Cardiology',
    date: '25-03-2025',
    time: '09:30',
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders appointment details correctly', () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Dr. Emily Chen')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('09:30')).toBeInTheDocument();
    // The date is formatted, so we check for the month name
    expect(screen.getByText(/March/)).toBeInTheDocument();
  });

  test('opens edit dialog when card is clicked', () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);
    
    fireEvent.click(screen.getByText('Dr. Emily Chen'));
    
    expect(screen.getByText('Edit Appointment')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toHaveValue('25-03-2025');
    expect(screen.getByLabelText('Time')).toHaveValue('09:30');
  });

  test('opens edit dialog when edit button is clicked', () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);
    
    fireEvent.click(screen.getByText('Edit'));
    
    expect(screen.getByText('Edit Appointment')).toBeInTheDocument();
  });

  test('opens delete dialog when cancel button is clicked', () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(screen.getByText('Cancel Appointment')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to cancel this appointment?')).toBeInTheDocument();
  });

  test('updates appointment when save changes is clicked', async () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);
    
    // Open edit dialog
    fireEvent.click(screen.getByText('Edit'));
    
    // Change date and time
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '26-03-2025' } });
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '10:00' } });
    
    // Save changes
    fireEvent.click(screen.getByText('Save Changes'));
    
    await waitFor(() => {
      expect(updateAppointment).toHaveBeenCalledWith({
        id: 1,
        date: '26-03-2025',
        time: '10:00',
      });
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  test('deletes appointment when confirmation is clicked', async () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />);
    
    // Open delete dialog
    fireEvent.click(screen.getByText('Cancel'));
    
    // Confirm deletion
    fireEvent.click(screen.getByText('Yes, Cancel It'));
    
    await waitFor(() => {
      expect(deleteAppointment).toHaveBeenCalledWith(1);
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });
});
