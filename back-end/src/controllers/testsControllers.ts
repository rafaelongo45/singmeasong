import { Request, Response } from "express";
import { CreateRecommendationData } from "../services/recommendationsService.js";
import testsService from "../services/testsService.js";

async function clearDatabase(req: Request, res: Response){
  await testsService.deleteDatabase();
  return res.sendStatus(200);
};

async function createMany(req:Request, res: Response){
  const data: CreateRecommendationData = req.body;
  await testsService.createManyRecommendations(data);
  return res.sendStatus(201);
}

async function getByName(req:Request, res: Response){
  const { name } = req.params;
  const recommendation = await testsService.findByName(name);
  return res.status(200).send(recommendation);
}


const testsControllers = {
  clearDatabase,
  createMany,
  getByName
};

export default testsControllers;