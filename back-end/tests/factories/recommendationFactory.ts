import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

function randomizer(){
  return Math.random() - 0.5;
} 

async function createRecommendation(){
  const prefixArr = ["https://youtu.be/", "https://www.youtube.com/", "www.youtube.com/", "youtu.be/"];
  const randomYtURL = prefixArr.sort(randomizer)[0]
  const data = {
    "name": faker.name.findName(),
    "youtubeLink": randomYtURL + faker.name.findName()
  }

  const recommendation = await prisma.recommendation.create({
    data
  });

  return recommendation;
};

async function createRecommendationBadScore(){
  const prefixArr = ["https://youtu.be/", "https://www.youtube.com/", "www.youtube.com/", "youtu.be/"];
  const randomYtURL = prefixArr.sort(randomizer)[0]
  const data = {
    "name": faker.name.findName(),
    "youtubeLink": randomYtURL + faker.name.findName(),
    "score": -5
  }

  const recommendation = await prisma.recommendation.create({
    data
  });

  return recommendation;
};

async function createsUpTo10Recommendations(){ //TODO: FINISH THIS FUNCTION
  const randomNumber = Math.ceil(Math.random() * 10);
  const data = [];
  for(let i = 0; i < randomNumber; i ++){
    data.push({
      
    })
  }
}

const recommendationFactory = {
  createRecommendation,
  createRecommendationBadScore
};

export default recommendationFactory;