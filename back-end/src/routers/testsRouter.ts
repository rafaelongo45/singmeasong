import { Router } from "express";

import testsControllers from "../controllers/testsControllers.js";

const testsRouter = Router();

testsRouter.post("/recommendations/many", testsControllers.createMany);
testsRouter.delete("/recommendations", testsControllers.clearDatabase);
testsRouter.get("/recommendations/name/:name", testsControllers.getByName);

export default testsRouter;