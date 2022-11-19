import joi from "joi";

export const userSignUpSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
  });