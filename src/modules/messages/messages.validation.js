import joi from "joi";

export const sendMessageSchema = {
  message: joi.string().min(3).max(500).required(),
  image: joi.string().optional(),
};
