export default class WaitUtils {
  static COMMON_TIMEOUT = 30000;

  static async click(element, reverse = false) {
    await element.waitForClickable({
      timeout: this.COMMON_TIMEOUT,
      reverse: isReverse
    });
    await element.click();
  }

  static async waitUntilDisplayed(element, isReverse = false) {
    await element.waitForDisplayed({
      timeout: this.COMMON_TIMEOUT,
      reverse: isReverse
    });
    return element.isDisplayed();
  }

  static async setValue(element, value) {
    await element.waitForClickable({
      timeout: this.COMMON_TIMEOUT
    });
    await element.setValue(value);
  }
}