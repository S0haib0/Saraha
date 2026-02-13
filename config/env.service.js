import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const mongoURL = process.env.MONGODB_URL;
const port = process.env.PORT;
const mood = process.env.MOOD;

const salt = process.env.SALT;

export const env = { port, mongoURL, mood, salt };
