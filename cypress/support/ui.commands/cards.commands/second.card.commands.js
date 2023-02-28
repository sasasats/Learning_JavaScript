import RandomUtils from "../../random.utils.js";

Cypress.Commands.add('uploadAvatar', (imageName) => {
  cy.get('.avatar-and-interests__upload-button').attachFile(imageName);
})

Cypress.Commands.add('unselectAllInterests', () => {
  cy.get('label[for="interest_unselectall"]').click();
})

Cypress.Commands.add('chooseInterests', (interestsQuantity) => {
  cy.get('.avatar-and-interests__interests-list__item')
    .find('input')
    .not('#interest_unselectall')
    .not('#interest_selectall')
    .parent()
    .each((elem, index, list) => {
      for (let i = 0; i < interestsQuantity; i++) {
        let randomIndex = RandomUtils.getRandomNumber(list.length);
        cy.get(list[randomIndex]).click();
        list.splice(randomIndex, 1);
      }
      return false;
    });
})

Cypress.Commands.add('goToCard3', () => {
  cy.get('button[class~=button--stroked]')
    .click();
})