import { UnauthorizedException } from "../utils/responses/error.response";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    UnauthorizedException("not authorized");
  }
  let decodedData = decodeToken(authorization);
  req.userId = decodedData.id;
};
