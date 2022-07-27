import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("recommendation search suite", () => {
  it("searches for the last 10 recommendations, finds all of them", async () => {
    const recommendationsLength =
      await recommendationFactory.createUpTo10Recommendations();
    const response = await supertest(app).get("/recommendations");
    const recommendations = response.body;
    expect(recommendations).toHaveLength(recommendationsLength);
  });

  it("searches for recommendations, but has no data in the database receives a body with length 0", async () => {
    const response = await supertest(app).get("/recommendations");
    const recommendations = response.body;
    expect(recommendations).toHaveLength(0);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
