import RandomUtils from '../../random.utils.js';

Cypress.Commands.add('enterPassword', (password) => {
  cy.get('input[placeholder="Choose Password"]')
    .clear()
    .type(`${password}`);
})

Cypress.Commands.add('enterEmail', (email) => {
  cy.get('input[placeholder="Your email"]')
    .clear()
    .type(`${email}`);
})

Cypress.Commands.add('enterDomain', (domain) => {
  cy.get('input[placeholder="Domain"]')
    .clear()
    .type(`${domain}`)
})

Cypress.Commands.add('openDomainDropdown', () => {
  cy.get('.dropdown__opener')
    .click();
})

Cypress.Commands.add('selectDomain', () => {
  cy.get('div[class=dropdown__list-item]')
    .each((element, index, list) => {
      cy.get(list[RandomUtils.getRandomNumber(list.length)]).click();
      return false;
    })
})

Cypress.Commands.add('acceptTermsConditions', () => {
  cy.get('#accept-terms-conditions')
    .parent('label')
    .click();
})

Cypress.Commands.add('goToNextCard', () => {
  cy.get('.button--secondary')
    .contains('Next')
    .click();
})

