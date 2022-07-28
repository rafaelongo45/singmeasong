import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("top recommendations search suite", () => {
  it("searches for the top random ammount recommendations with no recommendations registered, receives empty body", async () => {
    const randomAmmount = Math.ceil(Math.random() * 10);
    const response = await supertest(app).get(
      `/recommendations/top/${randomAmmount}`
    );
    const body = response.body;
    expect(body).toHaveLength(0);
  });

  it("searches for top recommendations, but sends a string instead of a number, receives code 500", async () => {
    const ammount = "ishouldn'tbehere";
    const response = await supertest(app).get(
      `/recommendations/top/${ammount}`
    );
    const statusCode = response.statusCode;
    expect(statusCode).toBe(500);
  });

  it("searches for the top random ammount recommendations with recommendations registered, receives ordered recommendations", async () => {
    const randomAmmount =
      await recommendationFactory.createUpTo11Recommendations();
    const response = await supertest(app).get(
      `/recommendations/top/${randomAmmount}`
    );
    const firstRecommendationScore = response.body[0].score;
    const secondRecommendationScore = response.body[1].score;
    expect(firstRecommendationScore).toBeGreaterThanOrEqual(
      secondRecommendationScore
    );
  });

  it("searches for the top random ammount recommendations with recommendations registered, receives the correct ammount of recommendations", async () => {
    const randomAmmount =
      await recommendationFactory.createUpTo11Recommendations();
    const response = await supertest(app).get(
      `/recommendations/top/${randomAmmount}`
    );
    const recommendations = response.body;
    expect(recommendations).toHaveLength(randomAmmount);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
