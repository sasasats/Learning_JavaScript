/// <reference types="cypress" />

import RandomUtils from "../utils/random.utils.js";
import commonData from "../fixtures/common.data.json";
import user from "../fixtures/user.json";
import '../support/commands.js'

describe('VK API task', () => {
  const RANDOM_STRING_LENGTH = 15;
  const LIKED_POST = 1;
  const USER_ID = user.id;

  it.only('Main scenario', () => {
    cy.log(`1 Go to the ${commonData.vkCommonUrl} webpage`);
    cy.visit('/');

    cy.log('2 Authorize');
    cy.authorization(user.login, user.password);

    cy.log('3 Go to "My profile"');
    cy.goToMyPage();

    let message = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);

    cy.log('4 Create post on the wall with randomly generated text using API-request and save id of the post from the API-response');
    cy.createPost(message).then((createPostResp) => {
      const postId = createPostResp.body.response.post_id;

      cy.log('5 Check that post with the sent text from the correct user appeared on the wall without refreshing the page');
      cy.isPostHasText(USER_ID, postId, message);

      cy.log('6 Edit the added post using API-request - change text and add (upload) a picture');
      message = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);
      cy.updatePost(USER_ID, postId, message, commonData.imageName, commonData.imageType);

      cy.log('8 Add a comment to the post with the randomly generated text using API-request.');
      message = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);
      cy.createComment(postId, message).then((createCommentResp) => {
        cy.log('9 Check that comment from the correct user was added to the post without refreshing the page.');
        const commentId = createCommentResp.body.response.comment_id;
        cy.isCommentHasText(USER_ID, commentId, message);
      });

      cy.log('10 Like the post using UI');
      cy.likePost(USER_ID, postId);

      cy.log('11 Check that the post received like from the correct user using API-request');
      cy.isPostLiked(postId).then((likedPostResp) => {
        expect(likedPostResp.body.response.liked).equals(LIKED_POST);
      });

      cy.log('12 Delete the post using API-request');
      cy.deletePost(postId);

      cy.log('13 Check that the post was deleted without refreshing the page');
      cy.isPostNotVisible(USER_ID, postId);
    })
  });
});