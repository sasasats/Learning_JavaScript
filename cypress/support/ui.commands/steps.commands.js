Cypress.Commands.add('authorization', (email, password) => {
  cy.enterEmail(email);
  cy.clickLoginButton();
  cy.enterPassword(password);
  cy.clickContinueButton();
})