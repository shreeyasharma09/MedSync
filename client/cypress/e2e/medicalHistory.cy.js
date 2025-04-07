/// <reference types="cypress" />

describe('Medical History Flow (Patient)', () => {
    beforeEach(() => {
      // 1. Start at the landing page
      cy.visit('/');
  
      // 2. Click the "Patient Care" option
      cy.contains('Patient Care').click();
  
      // 3. Click the "Next" button
      cy.contains('button', 'Next').click();
  
      // 4. On the sign-in page, fill in the email & password
      cy.get('input[name="healthCard"]').type('user_1@gmail.com');
      cy.get('input[name="password"]').type('123456');
  
      // 5. Click "Sign In"
      cy.contains('button', 'Sign In').click();
  
      // 6. Verify we land on the "/profile/p" page
      cy.url().should('include', '/profile/p');
  
      // 7. Navigate to the Medical History page
      //    Adjust this selector/step to match how your user reaches MedicalHistory.
      cy.contains('Medical History').click();
  
      // 8. Confirm we are on the Medical History page
      cy.url().should('include', '/medical-history');
    });
  
    it('displays initial data correctly', () => {
      // Check top-level heading
      cy.contains('h5', 'Medical History').should('be.visible');
  
      // Allergies section
      cy.contains('h6', 'Allergies').should('be.visible');
      cy.contains('Peanuts').should('be.visible');
      cy.contains('Pollen').should('be.visible');
      cy.contains('Penicillin').should('be.visible');
  
      // Medications section
      cy.contains('h6', 'Medications').should('be.visible');
      cy.contains('Ibuprofen').should('be.visible');
      cy.contains('Metformin').should('be.visible');
      cy.contains('Amoxicillin').should('be.visible');
  
      // Past Treatments section
      cy.contains('h6', 'Past Treatments').should('be.visible');
      cy.contains('Knee Surgery (2020)').should('be.visible');
      cy.contains('Physical Therapy (2021)').should('be.visible');
    });
  
    it('adds a new allergy successfully', () => {
      // Click "Add" next to the Allergies section
      cy.contains('h6', 'Allergies')
        .parent()
        .within(() => {
          cy.contains('button', 'Add').click();
        });
  
      // Type a new allergy
      cy.get('input[placeholder="Enter new allergies..."]').type('Dust');
  
      // Confirm (click check icon)
      cy.get('button')
        .filter((_, el) => el.innerHTML.includes('CheckCircleOutlineIcon'))
        .click();
  
      // New item should appear
      cy.contains('Dust').should('be.visible');
    });
  
    it('shows an error when adding an empty allergy', () => {
      // Click "Add" for Allergies
      cy.contains('h6', 'Allergies')
        .parent()
        .within(() => {
          cy.contains('button', 'Add').click();
        });
  
      // Click confirm without typing
      cy.get('button')
        .filter((_, el) => el.innerHTML.includes('CheckCircleOutlineIcon'))
        .click();
  
      // Check for error text
      cy.contains('This field cannot be empty').should('be.visible');
    });
  
    it('cancels adding a new allergy entry', () => {
      // Click "Add" for Allergies
      cy.contains('h6', 'Allergies')
        .parent()
        .within(() => {
          cy.contains('button', 'Add').click();
        });
  
      // Type something
      cy.get('input[placeholder="Enter new allergies..."]').type('Smoke');
  
      // Click the cancel (X) icon
      cy.get('button')
        .filter((_, el) => el.innerHTML.includes('CancelOutlinedIcon'))
        .click();
  
      // Should not see the input or "Smoke"
      cy.contains('Smoke').should('not.exist');
      cy.contains('This field cannot be empty').should('not.exist');
    });
  
    it('deletes an existing medication', () => {
      // "Metformin" is visible at first
      cy.contains('Metformin').should('be.visible');
  
      // Click the trash icon next to "Metformin"
      cy.contains('Metformin')
        .parent()
        .within(() => {
          cy.get('button')
            .filter((_, el) => el.innerHTML.includes('DeleteOutlineIcon'))
            .click();
        });
  
      // "Metformin" should disappear
      cy.contains('Metformin').should('not.exist');
    });
  });
  