import { Request, Response } from "express";
import testsService from "../services/testsService.js";

async function clearDatabase(req: Request, res: Response){
  await testsService.deleteDatabase();
  return res.sendStatus(200);
};

const testsControllers = {
  clearDatabase
};

export default testsControllers;