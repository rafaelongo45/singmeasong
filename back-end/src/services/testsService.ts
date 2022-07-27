import testsRepository from "../repositories/testsRepository.js";

async function deleteDatabase(){
  await testsRepository.deleteAll();
}

const testsService = {
  deleteDatabase
};

export default testsService;