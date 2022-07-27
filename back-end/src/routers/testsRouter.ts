import { Router } from "express";

import testsControllers from "../controllers/testsControllers.js";

const testsRouter = Router();

testsRouter.delete("/recommendations", testsControllers.clearDatabase);

export default testsRouter;