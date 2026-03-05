import joi from "joi";

export const signupSchema = joi.object({
  userName: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  age: joi.number().min(18).max(50).required().messages({
    "number.min": "age must be at least 18",
    "number.max": "age must be at most 50",
  }),
  password: joi
    .string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
  gender: joi.string().optional(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
});
