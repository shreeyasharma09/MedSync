describe('Healthcare Profile Update', () => {
  it('visits /profile/hp, edits all fields, and confirms changes', () => {
    // 1. Visit your Healthcare Profile route
    cy.visit('/profile/hp');

    // 2. Click "Update Information" to enable editing
    cy.contains('button', 'Update Information').click();

    // 3. Clear and update first/last name
    cy.get('input[name="firstName"]').clear().type('Jane');
    cy.get('input[name="lastName"]').clear().type('Smith');

    // 4. Clear and update MINC number
    cy.get('input[name="mincNumber"]').clear().type('CAMD-9999-9999');

    // 5. Update the hospital Autocomplete
    cy.get('[role="combobox"]').first().as('hospitalDropdown');
    cy.get('@hospitalDropdown').clear().type('Hospital 2');
    cy.contains('li', 'Hospital 2').click();

    // 6. Update the specialty Autocomplete
    cy.get('[role="combobox"]').eq(1).as('specialtyDropdown');
    cy.get('@specialtyDropdown').clear().type('Neurology');
    cy.contains('li', 'Neurology').click();

    // 7. Clear and update the password
    cy.get('input[name="password"]').clear().type('MyNewSecurePassword!');

    // 8. Click "Save Changes"
    cy.contains('button', 'Save Changes').click();

    // 9. Handle the confirmation dialog
    cy.contains('Confirm Changes');
    cy.contains('button', 'Confirm').click();

    // 10. Check success message
    cy.contains('Profile updated successfully!').should('be.visible');

    // 11. Verify updated fields are reflected (editing is now disabled)
    cy.get('input[name="firstName"]').should('have.value', 'Jane');
    cy.get('input[name="lastName"]').should('have.value', 'Smith');
    cy.get('input[name="mincNumber"]').should('have.value', 'CAMD-9999-9999');
    cy.get('input[name="password"]').should(
      'have.value',
      'MyNewSecurePassword!',
    );
  });
});
