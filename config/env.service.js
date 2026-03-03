import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

const mongoURL = process.env.MONGODB_URL;
const port = process.env.PORT;
const mood = process.env.MOOD;
const salt = process.env.SALT;
const adminSignature = process.env.JWT_ADMIN_SIGNATURE;
const userSignature = process.env.JWT_USER_SIGNATURE;
const jwt_key= process.env.JWT_KEY;
export const env = {
  port,
  mongoURL,
  mood,
  salt,
  adminSignature,
  userSignature,
  jwt_key
};
