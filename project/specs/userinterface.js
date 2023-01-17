import HomePage from "../pages/home.page.js";
import CardPage from "../pages/card.page.js";
import LoginCardSteps from "../steps/login.card.steps.js";
import BrowserUtils from "../../framework/utils/browser.utils.js";
import InterestsCardSteps from "../steps/interests.card.steps.js";
import { describe, it } from "mocha";
import { expect } from "chai";

describe('Userinterface task', () => {
  const homePage = new HomePage();
  const cardPage = new CardPage();

  const START_TIMER_TIME = "00:00:00";
  const FIRST_CARD_NUMBER = 1;
  const SECOND_CARD_NUMBER = 2;
  const INTERESTS_NUMBER = 2;

  before(async () => {
    await browser.maximizeWindow();
  })

  beforeEach(async () => {
    await BrowserUtils.open('');
    expect(await homePage.isOpened()).to.be.true;
    await homePage.clickLinkToCardsPage();
    expect(await cardPage.isOpened(FIRST_CARD_NUMBER)).to.be.true;
  })

  it('Fill the cards', async () => {
    await LoginCardSteps.login();
    expect(await cardPage.isOpened(SECOND_CARD_NUMBER)).to.be.true;
    await InterestsCardSteps.fillInformationAboutYourself(INTERESTS_NUMBER);
  })

  it('Hide help form', async () => {
    await cardPage.clickHideHelpFormButton();
    expect(await cardPage.isHelpFormHidden()).to.be.true;
  })

  it('Accept cookies', async () => {
    await cardPage.acceptCookies();
    expect(await cardPage.isCookiesFormDisplayed()).to.be.false;
  })

  it('Validate timer star time', async () => {
    expect(await cardPage.getTimerValue()).to.equal(START_TIMER_TIME);
  })
})