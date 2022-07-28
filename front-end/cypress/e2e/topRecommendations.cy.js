const URL = "http://localhost:3000/top"

describe("top recommendations suite", () => {
  beforeEach(() => {
    cy.deleteRecommendations();
  })

  it("receives all created recommendations", ()=> {
    cy.createsUpTo11Recommendations();
    cy.visit(URL);
    cy.get(".recommendation").should("exist");
  })
})