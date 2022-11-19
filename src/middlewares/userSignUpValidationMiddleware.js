import { userSignUpSchema } from "../models/userSignUpModel.js";

export default function userSignUpValidationMiddleware(req, res, next) {
  const { error } = userSignUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.send(errors);
  }

  next();
}
