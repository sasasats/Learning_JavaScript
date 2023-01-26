import WaitUtils from "../../framework/utils/wait.utils.js";

export default class Page {
  async isOpened(element) {
    return WaitUtils.waitUntilDisplayed(element);
  }
}