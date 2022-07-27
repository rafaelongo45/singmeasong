import { faker } from "@faker-js/faker";

Cypress.Commands.add("deleteRecommendations", () => {
  cy.request("DELETE", "http://localhost:5000/recommendations");
});