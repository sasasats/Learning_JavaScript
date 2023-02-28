/// <reference types="cypress" />

const INTERESTS_QUANTITY = 3;
const START_TIME = '00:00:00';

describe('template spec', () => {
  beforeEach(() => {
    cy.log('Navigate to home page');
    cy.visit('/');

    cy.log('Welcome page should be open');
    cy.isHomePageOpened();

    cy.log('Click the link to navigate the next page');
    cy.clickNextPageLink();

    cy.log('The "1" card should be open');
    cy.isCardOpened(1);
  })

  it('Test case 1', () => {
    cy.log('Input random valid password, email, accept the terms of use and click "next" button');
    cy.authorize();

    cy.log('The "2" card should be open');
    cy.isCardOpened(2);

    cy.log('Choose 3 random interests, upload image, click "Next" button');
    cy.fillProfile(INTERESTS_QUANTITY);

    cy.log('The "3" card should be open');
    cy.isCardOpened(3);
  })

  it('Test case 2', () => {
    cy.log('Hide help form');
    cy.hideHelpForm();

    cy.log('Help form should be hidden');
    cy.isHelpFormHidden();
  })

  it('Test case 3', () => {
    cy.log('Accept cookies');
    cy.acceptCookies();

    cy.log('Cookies form should be closed');
    cy.isCookiesBannerClosed();
  })

  it('Test case 4', () => {
    cy.log('Validate that timer starts from "00:00:00"');
    cy.isTimerStartsWith(START_TIME);
  })
})