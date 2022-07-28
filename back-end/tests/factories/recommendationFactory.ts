import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

function randomizer() {
  return Math.random() - 0.5;
}

async function createRecommendation() {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const data = {
    name: faker.name.findName(),
    youtubeLink: randomYtURL + faker.name.findName(),
  };

  const recommendation = await prisma.recommendation.create({
    data,
  });

  return recommendation;
}

async function createRecommendationBadScore() {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const data = {
    name: faker.name.findName(),
    youtubeLink: randomYtURL + faker.name.findName(),
    score: -5,
  };

  const recommendation = await prisma.recommendation.create({
    data,
  });

  return recommendation;
}

async function createUpTo11Recommendations() {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const randomNumber = Math.ceil(Math.random() * 10 + 1);
  const data = [];
  for (let i = 0; i < randomNumber; i++) {
    data.push({
      name: faker.name.findName(),
      youtubeLink: randomYtURL + faker.name.findName(),
      score: Math.ceil((Math.random() - 0.7) * 10),
    });
  }
  await prisma.recommendation.createMany({
    data,
  });

  return randomNumber;
}

const recommendationFactory = {
  createRecommendation,
  createRecommendationBadScore,
  createUpTo11Recommendations,
};

export default recommendationFactory;
