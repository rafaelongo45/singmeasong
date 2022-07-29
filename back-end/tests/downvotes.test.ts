import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";
import recommendationFactory from "./factories/recommendationFactory.js";
import recommendationRepository from "../src/repositories/recommendationRepository.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("downvote suite", () => {
  it("downvotes a link that doesn't exist, receives code 404", async () => {
    const nonExistingId = 0;
    const response = await supertest(app).post(
      `/recommendations/${nonExistingId}/downvote`
    );
    const statusCode = response.status;
    expect(statusCode).toBe(404);
  });

  it("downvotes a link sending a string instead of a number, receives code 500", async () => {
    const string = "ishouldn'tbehere";
    const response = await supertest(app).post(
      `/recommendations/${string}/downvote`
    );
    const statusCode = response.statusCode;
    expect(statusCode).toBe(500);
  });

  it("downvotes an existing link, receives code's previous score minus one", async () => {
    const recommendation = await recommendationFactory.createRecommendation();
    const id = recommendation.id;
    const previousScore = recommendation.score;

    await supertest(app).post(`/recommendations/${id}/downvote`);

    const updatedRecommendation = await recommendationRepository.find(id);
    const currentScore = updatedRecommendation.score;
    const wasUpdate = currentScore === previousScore - 1;

    expect(wasUpdate).toBe(true);
  });

  it("downvotes a recommendation that has -5 upvotes, recommendation should not exist anymore", async () => {
    const recommendation =
      await recommendationFactory.createRecommendationBadScore();
    const id = recommendation.id;

    await supertest(app).post(`/recommendations/${id}/downvote`);

    const updatedRecommendation = await recommendationRepository.find(id);

    expect(updatedRecommendation).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
