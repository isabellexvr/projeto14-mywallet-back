import joi from "joi";

export const registrySchema = joi.object({
    value: joi.required(),
    description: joi.string().required(),
    type: joi.string().valid("entry", "output").required(), 
    name: joi.string()
})