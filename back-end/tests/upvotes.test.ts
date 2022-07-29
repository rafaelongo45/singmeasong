import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";
import recommendationRepository from "../src/repositories/recommendationRepository.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("upvote suite", () => {
  it("upvotes a link that doesn't exist, receives code 404", async () => {
    const nonExistingId = 0;
    const response = await supertest(app).post(
      `/recommendations/${nonExistingId}/upvote`
    );
    const statusCode = response.statusCode;
    expect(statusCode).toBe(404);
  });

  it("upvotes a link sending a string instead of a number, receives code 500", async () => {
    const string = "ishouldn'tbehere";
    const response = await supertest(app).post(
      `/recommendations/${string}/upvote`
    );
    const statusCode = response.statusCode;
    expect(statusCode).toBe(500);
  });

  it("upvotes an existing link, receives code's previous score plus one", async () => {
    const recommendation = await recommendationFactory.createRecommendation();
    const id = recommendation.id;
    const previousScore = recommendation.score;
    await supertest(app).post(`/recommendations/${id}/upvote`);

    const updatedRecommendation = await recommendationRepository.find(
      recommendation.id
    );
    const currentScore = updatedRecommendation.score;

    const wasUpdate = currentScore === previousScore + 1;
    expect(wasUpdate).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
