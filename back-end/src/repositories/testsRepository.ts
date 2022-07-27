import { prisma } from "../database.js";

async function deleteAll(){
  await prisma.recommendation.deleteMany();
}

const testsRepository = {
  deleteAll
};

export default testsRepository;