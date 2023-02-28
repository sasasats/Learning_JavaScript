import RandomUtils from "../random.utils.js";

Cypress.Commands.add('authorize', () => {
  let email = RandomUtils.generateRandomString(RandomUtils.ENGILSH_ALPHABET, 5) +
    RandomUtils.generateRandomString(RandomUtils.NUMBERS, 3) +
    RandomUtils.generateRandomString(RandomUtils.ENGILSH_ALPHABET, 1)
      .toUpperCase();

  cy.enterPassword(email +
    RandomUtils.generateRandomString(RandomUtils.CYRILLIC_ALPHABET, 1));
  cy.enterEmail(email);
  cy.enterDomain(RandomUtils.generateRandomString(
    RandomUtils.ENGILSH_ALPHABET, 3) +
    RandomUtils.generateRandomString(RandomUtils.NUMBERS, 2));

  cy.openDomainDropdown();
  cy.selectDomain();
  cy.acceptTermsConditions();
  cy.goToNextCard();
})

Cypress.Commands.add('fillProfile', (interestsQuantity) => {
  cy.uploadAvatar('image.jpg');
  cy.unselectAllInterests();
  cy.chooseInterests(interestsQuantity);
  cy.goToCard3();
})