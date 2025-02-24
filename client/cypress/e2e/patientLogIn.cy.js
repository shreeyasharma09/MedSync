describe('Patient Login Flow', () => {
  it('logs in user_1@gmail.com with password 123456 and navigates to profile', () => {
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

    // 6. Verify we land on the "/profile" page
    cy.url().should('include', '/profile/p');
  });
});
