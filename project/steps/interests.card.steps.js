import InterestsCardPage from "../pages/interests.card.page.js";

class InterestsCardSteps {
  #interestsCardPage = new InterestsCardPage();

  async fillInformationAboutYourself() {
    await this.#interestsCardPage.clickUnselectAllCheckBox();
    await this.#interestsCardPage.selectInterests(2);
    await this.#interestsCardPage.clickGoToNextCardButton();
  }
}

export default new InterestsCardSteps();