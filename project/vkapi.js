import UserPage from './pages/user.page.js';
import MainPage from './pages/main.page.js';
import LoginPage from './pages/login.page.js';
import Steps from '../framework/utils/steps.js';
import VkApiUtils from '../framework/utils/vk.api.utils.js';
import RandomUtils from '../framework/utils/random.utils.js';
import BrowserUtils from '../framework/utils/browser.utils.js';

import { apiData } from '../framework/data/api.data.js';
import { userData } from '../framework/data/user.data.js';
import { vkApiLogger } from '../framework/utils/logger.js';

import { expect } from 'chai';

describe('VK API task', () => {
  const loginPage = new LoginPage();
  const mainPage = new MainPage();
  const userPage = new UserPage();

  const RANDOM_STRING_LENGTH = 20;
  const PHOTO_NAME = 'ochoba359.jpg';

  before(async () => {
    browser.maximizeWindow();
  })

  it('Main script', async () => {
    vkApiLogger.log(
      'info',
      `Go to the https://vk.com/ webpage`);
    BrowserUtils.open();
    expect(await loginPage.isOpened()).to.be.true;

    vkApiLogger.log(
      'info',
      'Authorize')
    await Steps.authorize(userData.login, userData.password);
    expect(await mainPage.isOpened()).to.be.true;

    vkApiLogger.log(
      'info',
      'Go to "My profile"');
    await mainPage.clickMyPage();
    expect(await userPage.isOpened()).to.be.true;

    vkApiLogger.log(
      'info',
      'Create post on the wall with randomly generated text using ' +
      ' API-request and save id of the post from the API-response.');
    let randomString = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);
    const postId = await VkApiUtils.createPost(randomString);

    vkApiLogger.log(
      'info',
      'Check that post with the sent text from the correct user appeared on ' +
      ' the wall without refreshing the page.');
    expect(await userPage.isWallPostDisplayed(postId)).to.be.true;
    expect(await userPage.getWallPostText(postId)).equals(randomString);

    vkApiLogger.log(
      'info',
      'Edit the added post using API-request - change text and add (upload)' +
      ' a picture.');
    randomString = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);
    const uploadedPhoto = await Steps.uploadPhoto(
      apiData.linkToResource(PHOTO_NAME));
    await VkApiUtils.changePost(postId, randomString, uploadedPhoto);

    vkApiLogger.log(
      'info',
      'Check that text was updated and the picture was uploaded' +
      ' (make sure that pictures are the same) without refreshing the page.');
    expect(await userPage.getWallPostText(postId)).equals(randomString);
    expect(await userPage.isWallPostPhotoDisplayed(
      postId, uploadedPhoto)).to.be.true;

    vkApiLogger.log(
      'info',
      'Add a comment to the post with the randomly generated text' +
      ' using API-request.');
    const commentId = await VkApiUtils.createComment(postId, randomString);

    vkApiLogger.log(
      'info',
      'Check that comment from the correct user was added to the post' +
      ' without refreshing the page.');
    userPage.clickShowNextComment();
    expect(await userPage.isCommentDisplayed(commentId)).to.be.true;
    expect(await userPage.getCommentText(commentId)).equals(randomString);

    vkApiLogger.log(
      'info',
      'Like the post using UI.');
    await userPage.clickPostLike(postId);

    vkApiLogger.log(
      'info',
      'Check that the post received like from the correctuser' +
      ' using API-request.');
    expect(await VkApiUtils.isPostLiked(postId)).equals(1);

    vkApiLogger.log(
      'info',
      'Delete the post using API-request.');
    await VkApiUtils.deletePost(postId);

    vkApiLogger.log(
      'info',
      'Check that the post was deleted without refreshing the page');
    expect(await userPage.isWallPostDisplayed(postId, true)).to.be.false;
  })
})