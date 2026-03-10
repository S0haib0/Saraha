import joi from "joi";

export const sendMessageSchema = joi.object({
  message: joi.string().min(3).max(500).required(),
  receiver: joi.string().required(),
  userId: joi.string().optional(),
  image: joi.string().optional(),
});
