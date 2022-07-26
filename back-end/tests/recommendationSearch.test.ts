import { prisma } from "../src/database.js"

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("recommendation search suite", () => {
  it("searches for the last 10 recommendations, finds all of them", async () => {
    
  });
})