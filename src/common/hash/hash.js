

import {hash,compare} from "bcrypt"
import { env } from "../../../config/index.js";


export const generateHash = async (planeText) => {
  const hashPassword = await hash(planeText, +env.salt);
  return hashPassword;
};

export const compareHash = async (planeText, hash) => {
  const isMatched = await compare(planeText, hash);
  return isMatched;
};