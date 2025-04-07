import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HospitalSearch from './HospitalSearch';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          hosp_id: 1,
          name: 'Hospital 1',
          distance: 6,
          expertCount: 1,
          rating: 4,
          lat: 43.4564,
          lon: -80.5122,
        },
      ],
    })
  ),
}));

describe('HospitalSearch Filtering', () => {
  test('Filters out hospitals with distance greater than selected maxDistance', async () => {
    render(
      <MemoryRouter initialEntries={['/search?specialty=cardio&issue_id=1&patient_id=1&issue=pain']}>
        <HospitalSearch />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Hospital 1')).toBeInTheDocument()
    );

    const distanceSelect = screen.getByTestId('max-distance-select');
    await userEvent.click(distanceSelect);
    const option = await screen.findByText('10 km');
    await userEvent.click(option);
    const newOption = await screen.findByText('5 km');
    await userEvent.click(newOption);

    await waitFor(() =>
      expect(screen.queryByText('Hospital 1')).not.toBeInTheDocument()
    );
  });
});
