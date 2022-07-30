/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

describe("recommendation creation suite", () => {
  beforeEach(() => {
    cy.deleteRecommendations();
  });

  it("creates a valid recommendation", () => {
    const recommendation = {
      name: faker.name.findName(),
      link: "https://www.youtube.com/watch?v=YR_wIb_n4ZU&list=RDYR_wIb_n4ZU&start_radio=1&ab_channel=Claranon",
    };
    cy.visit(URL);
    cy.get(".nameCreate").type(recommendation.name);
    cy.get(".linkCreate").type(recommendation.link);
    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.get(".buttonCreate").click();
    cy.wait("@createRecommendation");
    cy.get(".recommendation").should("exist");
  });

  it("creates a recommendation without sending data", () => {
    cy.visit(URL);
    cy.get(".buttonCreate").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Error creating recommendation!");
    });
  });

  it("creates a recommendation sending a link other than a youtube link", () => {
    const recommendation = {
      name: faker.name.findName(),
      link: faker.internet.domainName(),
    };
    cy.visit(URL);
    cy.get(".nameCreate").type(recommendation.name);
    cy.get(".linkCreate").type(recommendation.link);
    cy.get(".buttonCreate").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Error creating recommendation!");
    });
  });

  it("creates a recommendation sending a name but no link", () => {
    const recommendation = {
      name: faker.name.findName(),
    };
    cy.visit(URL);
    cy.get(".nameCreate").type(recommendation.name);
    cy.get(".buttonCreate").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Error creating recommendation!");
    });
  });

  it("creates a recommendation sending a link but no name", () => {
    const recommendation = {
      link: faker.internet.domainName(),
    };
    cy.visit(URL);
    cy.get(".linkCreate").type(recommendation.link);
    cy.get(".buttonCreate").click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Error creating recommendation!");
    });
  });
});

describe("vote recommendation suite", () => {
  beforeEach(() => {
    cy.deleteRecommendations();
  });

  it("upvotes a recommendation", () => {
    cy.visit(URL);
    cy.createRecommendation().then((value) => {
      cy.wrap(value).as("linkData");
    });

    cy.get("@linkData").then((data) => {
      const name = data.name;
      cy.getRecommendationByName(name);
      cy.get(".upvote").click();
    });

    cy.get("@recommendation").then((recommendation) => {
      cy.get(".score").should(
        "have.text",
        (recommendation.score + 1).toString()
      );
    });
  });

  it("downvotes a recommendation", () => {
    cy.visit(URL);
    cy.createRecommendation().then((value) => {
      cy.wrap(value).as("linkData");
    });

    cy.get("@linkData").then((data) => {
      const name = data.name;
      cy.getRecommendationByName(name);
      cy.get(".downvote").click();
    });

    cy.get("@recommendation").then((recommendation) => {
      cy.get(".score").should(
        "have.text",
        (recommendation.score - 1).toString()
      );
    });
  });

  it("downvotes a recommendation with bad score, deletes it", () => {
    cy.visit(URL);
    cy.badScoreRecommendation().then((value) => {
      cy.wrap(value).as("linkData");
    });

    cy.get(".downvote").click();

    cy.get(".recommendation").should("not.exist");
  });
});
