import { Router } from "express";
import {
  getRegistries,
  postRegistry,
} from "../controllers/registriesControllers.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import registryValidationMiddleware from "../middlewares/registryValidationMiddleware.js"


const registriesRouter = Router();

registriesRouter.use(tokenValidationMiddleware);
registriesRouter.get("/registries", getRegistries);
registriesRouter.post("/post-registry", registryValidationMiddleware, postRegistry);

export default registriesRouter;
