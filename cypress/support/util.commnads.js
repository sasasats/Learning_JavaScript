Cypress.Commands.add('getBinary', (fileName) => {
  return cy.fixture(fileName, 'base64');
})


Cypress.Commands.add('createFromData', (blob, fileName) => {
  const formData = new FormData();
  formData.set('file', blob, fileName);
})