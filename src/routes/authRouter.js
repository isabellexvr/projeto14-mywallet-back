import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import userSignUpValidationMiddleware from "../middlewares/userSignUpValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", userSignUpValidationMiddleware, signUp);

authRouter.post("/sign-in", signIn);

export default authRouter;
