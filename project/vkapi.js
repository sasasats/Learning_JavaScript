import BrowserUtils from "../framework/utils/browser.utils.js"
import LoginPage from "./pages/login.page.js";
import MainPage from "./pages/main.page.js";
import Steps from "./steps.js";
import { expect } from "chai"
import { userData } from "../framework/data/user.data.js";
import VkApiUtils from "../framework/utils/vk.api.utils.js";
import RandomUtils from "../framework/utils/random.utils.js";
import VkData from "../framework/data/vk.data.js";
import UserPage from "./pages/user.page.js";

describe('VK API task', () => {
  const loginPage = new LoginPage();
  const mainPage = new MainPage();
  const userPage = new UserPage();

  const RANDOM_STRING_LENGTH = 20;

  before(async () => {
    browser.maximizeWindow();
  })

  it('Main script', async () => {
    console.log(`Go to the ${VkData.URL} webpage`);
    BrowserUtils.open('');
    expect(await loginPage.isOpened()).to.be.true;

    console.log('Authorize');
    await Steps.Authorize(userData.login, userData.password);
    expect(await mainPage.isOpened()).to.be.true;

    console.log('Go to "My profile"');
    await mainPage.clickMyPage();
    expect(await userPage.isOpened()).to.be.true;

    console.log(`Create post on the wall with randomly generated text using
     API-request and save id of the post from the API-response.`);
    let randomString = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);
    const postId = await VkApiUtils.createPost(randomString);

    console.log(`Check that post with the sent text from the correct user
     appeared on the wall without refreshing the page.`)
    expect(await userPage.isWallPostDisplayed(postId)).to.be.true;
    expect(await userPage.getWallPostText(postId)).equals(randomString);

    console.log(`Edit the added post using API-request - change text and 
    add (upload) a picture.`)
    randomString = RandomUtils.getRandomString(RANDOM_STRING_LENGTH);
    await VkApiUtils.changePostText(postId, randomString);

    console.log(`Add a comment to the post with the randomly generated text
     using API-request.`);
    const commentId = await VkApiUtils.createComment(postId, randomString);

    console.log(`Check that comment from the correct user was added to the post
     without refreshing the page.`)
    userPage.clickShowNextComment();
    expect(await userPage.isCommentDisplayed(commentId)).to.be.true;
    expect(await userPage.getCommentText(commentId)).equals(randomString);

    console.log(`Like the post using UI.`);
    await userPage.clickPostLike(postId);

    console.log(`Check that the post received like from the correct user using
     API-request.`);
    expect(await VkApiUtils.isPostLiked(postId)).equals(1);

    console.log('Delete the post using API-request.');
    await VkApiUtils.deletePost(postId);

    console.log('Check that the post was deleted without refreshing the page');
    expect(await userPage.isWallPostDisplayed(postId, true)).to.be.false;





    // await browser.debug();
  })

  it.only('a', async () => {
    const res = await VkApiUtils.uploadPhoto();
    console.log(`\n\n${res}\n\n`);
  })
})