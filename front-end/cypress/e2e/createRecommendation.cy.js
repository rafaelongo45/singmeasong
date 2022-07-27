/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000"

describe('recommendation creation suite', () => {
  beforeEach(() => {
    cy.deleteRecommendations();
  })

  it('creates a valid recommendation', () => {
    const recommendation = {
      name: faker.name.findName(),
      link: "https://www.youtube.com/watch?v=YR_wIb_n4ZU&list=RDYR_wIb_n4ZU&start_radio=1&ab_channel=Claranon"
    }
    cy.visit(URL);
    cy.get(".nameCreate").type(recommendation.name);
    cy.get(".linkCreate").type(recommendation.link);
    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get(".buttonCreate").click();
    cy.wait("@createRecommendation");
    cy.get(".recommendation").should("exist"); 
  });

  it('creates a recommendation without sending data', () => {
    cy.visit(URL);
    cy.intercept("POST", "/recommendations").as("invalidRecommendation");
    cy.get(".buttonCreate").click();
    cy.on("window:alert", (alert) => {
        expect(alert).to.contains('Error creating recommendation!')
    })
  })
});

