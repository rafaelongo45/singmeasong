const URL = "http://localhost:3000"

describe("navbar suite", () => {
  it("clicks on trending button, redirects to trending url", () => {
    cy.visit(URL);
    cy.get(".trendingButton").click();
    cy.url().should("equal", "http://localhost:3000/top");
  })

  it("clicks on random button, redirects to random url", () => {
    cy.visit(URL);
    cy.get(".randomButton").click();
    cy.url().should("equal", "http://localhost:3000/random");
  })
})