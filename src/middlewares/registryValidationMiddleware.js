import { registrySchema } from "../models/registryModel.js";

export default function registryValidationMiddleware(req, res, next){
    const { error } = registrySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.send(errors);
    }
  
    next();
}