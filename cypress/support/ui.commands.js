Cypress.Commands.add('login', (email, password) => {
  cy.get('#index_email').type(email);
  cy.get('button[type=submit]>span').click();
  cy.get('.vkc__TextField__wrapper>input[name=password]').type(password);
  cy.get('.vkuiButton__in').click();
})

Cypress.Commands.add('goToMyPage', () => {
  cy.get('#l_pr').click();
})