/// <reference types="cypress" />

const URL = "http://localhost:3000/random";

describe("random recommendations suite", () => {
  beforeEach(() => {
    cy.deleteRecommendations();
  });

  it("receives a recommendation, it should exist", () => {
    cy.createRecommendationValidLink();
    cy.createRecommendationValidLink();
    cy.createRecommendationValidLink();
    cy.createRecommendationValidLink();
    cy.visit(URL);
    cy.get(".recommendation").should("exist");
  });
});
