import RandomUtils from "../../framework/utils/random.utils.js";

export default class InterestsCardPage {
  get unselectAllCheckBox() {
    return $("//input[@id='interest_unselectall']/parent::label");
  }

  get interests() {
    return $$(`//input[@id!='interest_unselectall' and
     @id!='interest_selectall']/parent::label`)
  }

  get goToNextCardButton() {
    return $("//button[text()='Next']");
  }

  async clickUnselectAllCheckBox() {
    await this.unselectAllCheckBox.click();
  }

  async selectInterests(quantity) {
    for (const interest of
      await RandomUtils.getRandomElements(this.interests, quantity)) {
      await interest.click();
    }
  }

  async clickGoToNextCardButton() {
    await this.goToNextCardButton.click();
  }
}