import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("random recommendation search suite", () => {
  it("searches for a random recommendation with no recommendations registered, receives code 404", async () => {
    const response = await supertest(app).get("/recommendations/random");
    const statusCode = response.statusCode;
    expect(statusCode).toBe(404);
  });

  it("searches for a random recommendation, finds a recommendation", async () => {
    await recommendationFactory.createUpTo11Recommendations();
    const response = await supertest(app).get("/recommendations/random");
    const recommendation = response.body;
    expect(recommendation).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
