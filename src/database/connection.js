import mongoose from "mongoose";
import { env } from "../../config/index.js";
console.log(env.mongoURL);
export const databaseConnection = async () => {
  await mongoose
    .connect(env.mongoURL)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("error connecting to database", error);
    });
};
