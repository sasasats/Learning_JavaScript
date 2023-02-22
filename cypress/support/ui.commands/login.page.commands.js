Cypress.Commands.add('enterEmail', (email) => {
  cy.get('#index_email').type(email);
})

Cypress.Commands.add('clickLoginButton', () => {
  cy.get('button[type=submit]>span').click();
})

Cypress.Commands.add('enterPassword', (password) => {
  cy.get('.vkc__TextField__wrapper>input[name=password]').type(password);
})

Cypress.Commands.add('clickContinueButton', () => {
  cy.get('.vkuiButton__in').click();
})