export default class WaitUtils {
  static async click(element) {
    await element.waitForClickable({ timeout: 30000 });
    await element.click();
  }

  static async setValue(element, value) {
    await element.waitForClickable({ timeout: 30000 });
    await element.setValue(value);
  }
}