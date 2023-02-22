Cypress.Commands.add('getPost', (userId, postId) => {
  return cy.get(`#post${userId}_${postId}`, { timeout: 30000 });
})

Cypress.Commands.add('getComment', (userId, commentId) => {
  return cy.get(`#wpt${userId}_${commentId}`, { timeout: 30000 });
})

Cypress.Commands.add('isPostHasText', (userId, postId, message) => {
  cy.getPost(userId, postId)
    .find('div[class~=wall_post_text]')
    .should('have.text', message);
})

Cypress.Commands.add('isPostHasImage', (userId, postId, imageId) => {
  cy.getPost(userId, postId)
    .find('a[class=MediaGrid__interactive]')
    .should('have.attr', 'href', `/photo${userId}_${imageId}`);
})

Cypress.Commands.add('isPostNotVisible', (userId, postId) => {
  cy.getPost(userId, postId)
    .should('not.be.visible');
})

Cypress.Commands.add('likePost', (userId, postId) => {
  cy.getPost(userId, postId)
    .find('.PostButtonReactions__icon')
    .click();
})

Cypress.Commands.add('isCommentHasText', (userId, commentId, message) => {
  cy.getComment(userId, commentId)
    .find('.wall_reply_text')
    .should('have.text', message);
})