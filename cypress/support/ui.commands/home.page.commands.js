Cypress.Commands.add('isHomePageOpened', () => {
  cy.get('div[class~=start]')
    .should('be.visible');
})

Cypress.Commands.add('clickNextPageLink', () => {
  cy.get('.start__link')
    .click();
})