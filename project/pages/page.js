export default class Page {
  async isOpened(element) {
    return element.isDisplayed();
  }
}