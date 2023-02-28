Cypress.Commands.add('isCardOpened', (cardNumber) => {
  cy.get('.page-indicator')
    .should('have.text', `${cardNumber} / 4`);
})

Cypress.Commands.add('isTimerStartsWith', (startTime) => {
  cy.get('div[class~=timer]')
    .should('have.text', `${startTime}`);
})

Cypress.Commands.add('acceptCookies', () => {
  cy.get('button[class~=button--transparent]')
    .click();
})

Cypress.Commands.add('isCookiesBannerClosed', () => {
  cy.get('.cookies')
    .should('not.exist');
})

Cypress.Commands.add('hideHelpForm', () => {
  cy.get('button[class~=help-form__send-to-bottom-button]')
    .click();
})

Cypress.Commands.add('isHelpFormHidden', () => {
  cy.get('div[class="help-form is-hidden"]')
    .should('be.visible');
})