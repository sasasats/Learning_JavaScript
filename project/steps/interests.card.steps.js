import InterestsCardPage from "../pages/interests.card.page.js";

class InterestsCardSteps {
  #interestsCardPage = new InterestsCardPage();

  async fillInformationAboutYourself(interestsNumber) {
    await this.#interestsCardPage.clickUnselectAllCheckBox();
    await this.#interestsCardPage.selectInterests(interestsNumber);
    await this.#interestsCardPage.clickGoToNextCardButton();
  }
}

export default new InterestsCardSteps();