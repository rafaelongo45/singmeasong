import { prisma } from "../database.js";
import { CreateRecommendationData } from "../services/recommendationsService.js";

async function deleteAll(){
  await prisma.recommendation.deleteMany();
}

async function createMany(data: CreateRecommendationData){
  await prisma.recommendation.createMany({
    data
  })
}

const testsRepository = {
  deleteAll,
  createMany
};

export default testsRepository;