import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PatientBookings from './PatientBooking';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('PatientBookings Component', () => {
  const mockExpert = {
    first_name: 'Maya',
    last_name: 'Patel',
    specialty: 'Cardiology',
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [mockExpert],
    });

    // Mock window.alert
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders expert data', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/patient-bookings?patient_id=1&issue_id=2&issue=BackPain&specialty=Cardiology&hosp_id=3',
        ]}
      >
        <PatientBookings />
      </MemoryRouter>
    );

    expect(axios.get).toHaveBeenCalledWith('/api/experts', {
      params: {
        hosp_id: '3',
        issue_id: '2',
        patient_id: '1',
      },
    });

    // Wait for expert's name to show up
    await waitFor(() => {
      expect(screen.getByText('Dr. Maya Patel')).toBeInTheDocument();
      expect(screen.getByText('Cardiology')).toBeInTheDocument();
    });
  });

  it('shows time slots when "Find a time slot" is clicked', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/patient-bookings?patient_id=1&issue_id=2&issue=BackPain&specialty=Cardiology&hosp_id=3',
        ]}
      >
        <PatientBookings />
      </MemoryRouter>
    );

    const buttons = await screen.findAllByText('Find a time slot');
    fireEvent.click(buttons[0]);
    

    // Expect a time slot like "09:00 - 09:30" to appear
    expect(await screen.findByText(/09:00 - 09:30/)).toBeInTheDocument();
  });
});
