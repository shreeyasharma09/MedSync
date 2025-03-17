import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {AppointmentCard} from './appointment-card';
import {updateAppointment, deleteAppointment} from './appointment-actions';

// Mock the appointment actions
jest.mock('./appointment-actions', () => ({
  updateAppointment: jest.fn().mockResolvedValue({success: true}),
  deleteAppointment: jest.fn().mockResolvedValue({success: true}),
}));


// Sample appointment data for testing
const mockAppointment = {
  id: 1,
  doctorName: "Dr. Emily Chen",
  specialty: "Cardiology",
  date: "25-03-2025",
  time: "09:30",
}

const mockOnUpdate = jest.fn()

describe("AppointmentCard Component", () => {
  beforeEach(() => {
    
    jest.clearAllMocks()
  })

  test("renders appointment information correctly", () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />)

    // Check if doctor name is displayed
    expect(screen.getByText("Dr. Emily Chen")).toBeTruthy()

    // Check if specialty is displayed
    expect(screen.getByText("Cardiology")).toBeTruthy()

    // Check if time is displayed
    expect(screen.getByText("09:30")).toBeTruthy()

    // Check if edit and cancel buttons are present
    expect(screen.getByText("Edit")).toBeTruthy()
    expect(screen.getByText("Cancel")).toBeTruthy()
  })

  test("opens edit dialog when edit button is clicked", () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />)

    // Click the edit button
    fireEvent.click(screen.getByText("Edit"))

    // Check if dialog is opened
    expect(screen.getByText("Edit Appointment")).toBeTruthy()
  })

  test("opens delete confirmation dialog when cancel button is clicked", () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />)

    // Click the cancel button
    fireEvent.click(screen.getByText("Cancel"))

    // Check if confirmation dialog is opened
    expect(screen.getByText("Cancel Appointment")).toBeTruthy()
    expect(screen.getByText(/Are you sure you want to cancel this appointment/)).toBeTruthy()
  })

  test("updates appointment when save changes button is clicked", async () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />)

    // Open edit dialog
    fireEvent.click(screen.getByText("Edit"))

    // Click save changes
    fireEvent.click(screen.getByText("Save Changes"))

    // Check if updateAppointment was called with correct data
    await waitFor(() => {
      expect(updateAppointment).toHaveBeenCalledWith({
        id: 1,
        date: "25-03-2025",
        time: "09:30",
      })
    })

    // Check if onUpdate callback was called
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled()
    })
  })

  test("deletes appointment when confirmation is confirmed", async () => {
    render(<AppointmentCard appointment={mockAppointment} onUpdate={mockOnUpdate} />)

    // Open delete dialog
    fireEvent.click(screen.getByText("Cancel"))

    // Confirm deletion
    fireEvent.click(screen.getByText("Yes, Cancel It"))

    // Check if deleteAppointment was called with correct id
    await waitFor(() => {
      expect(deleteAppointment).toHaveBeenCalledWith(1)
    })

    // Check if onUpdate callback was called
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalled()
    })
  })
})

