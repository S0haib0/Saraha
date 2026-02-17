import { env } from "../../../config/index.js";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  let signature = undefined;
  let audience = undefined;
  switch (user.role) {
    case "0":
      signature = env.adminSignature;
      audience = "Admin";
      break;
    default:
      signature = env.userSignature;
      audience = "User";
      break;
  }
  let token = jwt.sign({ id: user._id }, signature, { audience });
  return { token };
};
