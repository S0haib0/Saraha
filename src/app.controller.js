import express from "express";
import { env } from "../config/env.service.js";
import { databaseConnection } from "./database/index.js";
import { globalErrorHandler } from "./common/utils/responses/index.js";
import authRouter from "./modules/authModule/auth.controller.js";
import messageRouter from "./modules/messages/messages.controller.js";
import userRouter from "./modules/user/user.controller.js";

export const bootstrap = async () => {
  const app = express();
  app.use(express.json());
  app.use("/upload", express.static("upload"));
  app.use("/auth", authRouter);
  app.use("/messages", messageRouter);
  app.use("user", userRouter);
  await databaseConnection();
  app.use("{*dummy}", (req, res) => res.status(404).json("invalid route"));
  app.use(globalErrorHandler);
  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
};
