/// <reference types="cypress" />

describe('SignupFormHP - Intentionally Failing Test', () => {
    beforeEach(() => {
      // 1. Start at the landing page
      cy.visit('/');
  
      // 2. Click "Healthcare Practitioner"
      cy.contains('Healthcare Practitioner').click();
  
      // 3. Click "Next"
      cy.contains('button', 'Next').click();
  
      // 4. Click "Create account" on the sign-in page
      cy.contains('Create an account').click();
    });
  
    it('should fail if it actually goes to /ConfirmationVerifyH', () => {
      // Fill out all required fields
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="mincNumber"]').type('test@example.com');
      cy.get('input[name="dob"]').type('2000-01-01');
  
      // Select Hospital
      cy.contains('label', 'Hospital')
        .parent()
        .click();
      cy.contains('li', 'Hospital 1').click();
  
      // Select Specialty
      cy.contains('label', 'Specialty')
        .parent()
        .click();
      cy.contains('li', 'Cardiology').click();
  
      // Password
      cy.get('input[name="password"]').type('password123');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Because the app navigates to '/ConfirmationVerifyH', the check below is WRONG on purpose:
      cy.contains('Firebase: Error (auth/email-already-in-use');
    });
  });
