import { UnauthorizedException } from "../utils/responses/error.response.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
import { decodeToken } from "../security/security.js";
export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return UnauthorizedException("not authorized");
  }
  const [flag, token] = authorization.split(" ");
  switch (flag) {
    case "Basic":
      let data = Buffer.from(token, "base64").toString();
      let [email, password] = data.split(":");
      break;
    case "Bearer":
      let decodedData = decodeToken(authorization, decoded);
      req.userId = decodedData.id;
      next();
    default:
      break;
  }
};
