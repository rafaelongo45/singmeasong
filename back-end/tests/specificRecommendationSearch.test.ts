import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("specific recommendation seatch suite", () => {
  it("searches for a non existing recommendation", async () => {
    const id = 0;
    const response = await supertest(app).get(`/recommendations/${id}`);
    const statusCode = response.statusCode;
    expect(statusCode).toBe(404);
  });

  it("searches for a recommendation sending a string instead of a number", async () => {
    const id = "ishouldn'tbehere";
    const response = await supertest(app).get(`/recommendations/${id}`);
    const statusCode = response.statusCode;
    expect(statusCode).toBe(500);
  });

  it("searches for a non existing recommendation sending a string instead of a number", async () => {
    const id = "ishouldn'tbehere";
    const response = await supertest(app).get(`/recommendations/${id}`);
    const statusCode = response.statusCode;
    expect(statusCode).toBe(500);
  });

  it("searches for a recommendation that exists, receives the recommendation", async () => {
    const recommendation = await recommendationFactory.createRecommendation();
    const id = recommendation.id;
    const response = await supertest(app).get(`/recommendations/${id}`);
    const searchedRecommendation = response.body;
    expect(searchedRecommendation).toEqual(recommendation);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
