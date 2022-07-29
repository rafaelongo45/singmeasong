import recommendationRepository from "../repositories/recommendationRepository.js";
import testsRepository from "../repositories/testsRepository.js";
import { CreateRecommendationData } from "./recommendationsService.js";

async function deleteDatabase(){
  await testsRepository.deleteAll();
}

async function createManyRecommendations(data: CreateRecommendationData){
  await testsRepository.createMany(data)
}

async function findByName(name: string){
  const recommendation = await recommendationRepository.findByName(name);
  return recommendation;
}

const testsService = {
  deleteDatabase,
  createManyRecommendations,
  findByName
};

export default testsService;