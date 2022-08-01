/// <reference types="cypress" />

const URL = "http://localhost:3000/top";

describe("top recommendations suite", () => {
  beforeEach(() => {
    cy.deleteRecommendations();
  });

  it("receives all created recommendations", () => {
    cy.createsUpTo11Recommendations();
    cy.visit(URL);
    cy.get(".recommendation").should("exist");
  });

  it("receives all created recommendations in the correct order", () => {
    cy.createsUpTo11Recommendations();
    cy.visit(URL);
    cy.get('.recommendation')
      .eq(0)
      .find('p')
      .invoke('text')
      .then(parseInt)
      .as('firstScore')
    
    cy.get('.recommendation')
      .eq(1)
      .find('p')
      .invoke('text')
      .then(parseInt)
      .as('secondScore')

    cy.get('@firstScore').then((firstScore) => {
      const first = firstScore
      console.log(first)
      cy.get('@secondScore').then((secondScore) => {
        const second = secondScore;
        expect(first).to.be.greaterThan(second)
      })
    })
  })
});

