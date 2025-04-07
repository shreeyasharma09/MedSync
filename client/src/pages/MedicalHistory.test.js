import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MedicalHistory from './MedicalHistory';

describe('MedicalHistory (Simple Tests)', () => {
  test('can delete the "Peanuts" allergy', async () => {
    render(<MedicalHistory />);

    const peanutsItem = screen.getByText('Peanuts');
    expect(peanutsItem).toBeInTheDocument();

    const peanutsContainer = peanutsItem.closest('div'); 
    const deleteButton = within(peanutsContainer).getByRole('button');

    await userEvent.click(deleteButton);

    expect(screen.queryByText('Peanuts')).not.toBeInTheDocument();
  });
});
