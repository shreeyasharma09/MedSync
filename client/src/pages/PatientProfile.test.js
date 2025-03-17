import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import PatientProfile from './PatientProfile';

describe('PatientProfile Component', () => {
  test('toggles password visibility when visibility icon is clicked', () => {
    render(<PatientProfile />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput.getAttribute('type')).toBe('password');
    const visibilityToggle = screen.getByRole('button', {
      name: /toggle password visibility/i,
    });
    fireEvent.click(visibilityToggle);
    expect(passwordInput.getAttribute('type')).toBe('text');
    fireEvent.click(visibilityToggle);
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  test('displays error messages when trying to save with empty fields', () => {
    render(<PatientProfile />);

    const updateButton = screen.getByRole('button', {
      name: /update information/i,
    });
    fireEvent.click(updateButton);

    const inputFields = screen.getAllByRole('textbox');
    inputFields.forEach(input =>
      fireEvent.change(input, {target: {value: ''}}),
    );

    const saveButton = screen.getByRole('button', {name: /save changes/i});
    fireEvent.click(saveButton);

    const errorMessages = screen.getAllByText('This field is required');
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
