describe('Patient Profile Update', () => {
  it('visits /profile/p, edits fields, confirms, and checks success', () => {
    // 1. Visit the patient profile route
    cy.visit('/profile/view-profile');

    // 2. Click "Update Information" to enable editing
    cy.contains('button', 'Update Information').click();

    // 3. Edit First Name
    cy.get('input[name="firstName"]').clear().type('Jack');

    // 4. Edit Last Name
    cy.get('input[name="lastName"]').clear().type('Bauer');

    // 5. Edit Health Card Number
    cy.get('input[name="healthCardNumber"]').clear().type('9876-543-210-XY');

    // 6. Edit Date of Birth
    cy.get('input[name="dateOfBirth"]').clear().type('1982-12-01');

    // 7. Edit Address
    cy.get('input[name="address"]')
      .clear()
      .type('456 Elm St, Testville, AB 98765');

    // 8. Edit Email
    cy.get('input[name="email"]').clear().type('jack.bauer@example.com');

    // 9. Edit Password
    cy.get('input[name="password"]').clear().type('NewPatientPassword!');

    // 10. Click "Save Changes"
    cy.contains('button', 'Save Changes').click();

    // 11. The confirmation dialog appears -> confirm
    cy.contains('Confirm Changes');
    cy.contains('button', 'Confirm').click();

    // 12. Check success Snackbar
    cy.contains('Profile updated successfully!').should('be.visible');

    // 13. Verify that the fields now reflect the updated values
    cy.get('input[name="firstName"]').should('have.value', 'Jack');
    cy.get('input[name="lastName"]').should('have.value', 'Bauer');
    cy.get('input[name="healthCardNumber"]').should(
      'have.value',
      '9876-543-210-XY',
    );
    cy.get('input[name="dateOfBirth"]').should('have.value', '1982-12-01');
    cy.get('input[name="address"]').should(
      'have.value',
      '456 Elm St, Testville, AB 98765',
    );
    cy.get('input[name="email"]').should(
      'have.value',
      'jack.bauer@example.com',
    );
    cy.get('input[name="password"]').should(
      'have.value',
      'NewPatientPassword!',
    );
  });
});
