import { userData } from "../../framework/data/user.data.js";
import Page from "./page.js";
import WaitUtils from "../../framework/utils/wait.utils.js";
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
    await (await this.getWallPost(postId)).waitForDisplayed({ reverse: isReverse });
    return (await this.getWallPost(postId)).isDisplayed();
  }

  async getWallPostText(postId) {
    return $(parameterizedLocators.post(userData.id, postId,
      "//div[contains(@class,'wall_post_text')]")).getText();
  }

  async getComment(commentId) {
    return $(parameterizedLocators.comment(userData.id, commentId));
  }

  async isCommentDisplayed(commentId) {
    await (await this.getComment(commentId)).waitForClickable({ timeout: 10000 });
    return (await this.getComment(commentId)).isDisplayed();
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
    await this.profileHeader.waitForClickable({ timeout: 10000 });
    return super.isOpened(this.profileHeader);
  }
}