import Page from "./page.js";
import WaitUtils from "../../framework/utils/wait.utils.js";

import { userData } from "../../framework/data/user.data.js";
import { parameterizedLocators } from "../../framework/data/parametrized.locators.js";

export default class UserPage extends Page {

  get profileHeader() {
    return $("//div[@class='ProfileHeader']");
  }

  get showNextComment() {
    return $("//span[@class='js-replies_next_label']");
  }

  async getWallPost(postId) {
    return $(parameterizedLocators.post(userData.id, postId));
  }

  async isWallPostDisplayed(postId, isReverse = false) {
    return WaitUtils.waitUntilDisplayed(
      await this.getWallPost(postId),
      isReverse
    );
  }

  async getWallPostText(postId) {
    return $(parameterizedLocators.post(userData.id, postId,
      "//div[contains(@class,'wall_post_text')]")).getText();
  }

  async isWallPostPhotoDisplayed(postId, photo) {
    return $(parameterizedLocators.post(userData.id, postId,
      `//a[@href='/photo${userData.id}_${photo.id}']`)).isDisplayed();
  }

  async getComment(commentId) {
    return $(parameterizedLocators.comment(userData.id, commentId));
  }

  async isCommentDisplayed(commentId, isReverse = false) {
    return WaitUtils.waitUntilDisplayed(
      await this.getComment(commentId),
      isReverse
    );
  }

  async getCommentText(commentId) {
    return $(parameterizedLocators.comment(userData.id, commentId,
      "//div[@class='wall_reply_text']")).getText();
  }

  async clickPostLike(postId) {
    return $(parameterizedLocators.post(userData.id, postId,
      "//div[contains(@class,'PostButtonReactions__icon')]")).click();
  }

  async clickShowNextComment() {
    await this.showNextComment.click();
  }

  async isOpened() {
    return super.isOpened(this.profileHeader);
  }
}