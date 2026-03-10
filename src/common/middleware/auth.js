import { UnauthorizedException } from "../utils/responses/error.response.js";
import { decodeToken } from "../security/security.js";
import { createRevokeKey } from "../../database/redis.service.js";
export const auth = async (req, res, next) => {
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
      let decodedData = decodeToken(token);
      let revoked = await get(
        createRevokeKey({ userId: decodedData.id, token }),
      );
      if (revoked !== null) {
        throw new Error("already logged out");
      }
      req.userId = decodedData.id;
      req.token = token;
      req.decoded = decodedData;
      next();
    default:
      break;
  }
};
