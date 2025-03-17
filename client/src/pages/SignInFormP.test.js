import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FirebaseContext from '../components/Firebase/context';
import SignInFormP from '../pages/SignInFormP.js';

const mockFirebase = {
  doSignInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
};

describe('SignInFormP Component', () => {

  test('allows user to input email and password', () => {
    render(
      <FirebaseContext.Provider value={mockFirebase}>
        <MemoryRouter>
          <SignInFormP />
        </MemoryRouter>
      </FirebaseContext.Provider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls Firebase sign-in function on form submit', async () => {
    render(
      <FirebaseContext.Provider value={mockFirebase}>
        <MemoryRouter>
          <SignInFormP />
        </MemoryRouter>
      </FirebaseContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(mockFirebase.doSignInWithEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });
});
