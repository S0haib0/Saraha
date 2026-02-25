import { providerEnums } from "../../common/enums/enum.service.js";
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/utils/responses/error.response.js";
import { findById, findOne } from "../../database/database.service.js";
import { userModel } from "../../database/index.js";
import { generateHash, compareHash } from "../../common/index.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
import { decodeRefreshToken } from "../../common/security/security.js";

export const signup = async (data) => {
  let { userName, email, password } = data;
  let existUser = await findOne({ model: userModel, filter: { email } });
  if (existUser) {
    return ConflictException({ message: "user already exists" });
  }
  let hashedPassword = await generateHash(password);
  let addedUser = await userModel.insertOne({
    userName,
    email,
    password: hashedPassword,
  });
  return addedUser;
};

export const login = async (data) => {
  let { email, password } = data;
  let existUser = await findOne({
    model: userModel,
    filter: { email, password, provider: providerEnums.System },
  });
  if (existUser) {
    const isMatched = await compareHash(password, existUser.password);
    if (isMatched) {
      let token = jwt.sign({ id: existUser._id }, "route");
      return { existUser, token };
    }
  }
  return NotFoundException({ message: "user not found" });
};

export const getUserById = async (headers) => {
  let { authorization } = headers;
  if (!authorization) {
    UnauthorizedException("not authorized");
  }
  let decoded = jwt.verify(authorization, "route");
  let userData = await findById({ model: userModel, id: decoded.id });
  return userData;
};

export const generateAccessToken = (token) => {
  let decodedData = decodeRefreshToken(token);
  let signature = undefined;
  switch (decodedData.aud) {
    case "Admin":
      signature = env.adminSignature;
      break;
    case "User":
      signature = env.userSignature;
      break;
  }
  let accessToken = jwt.sign({ id: decodedData.id }, signature, {
    expiresIn: "30m",
    audience: decodedData.aud,
  });
  return accessToken;
};
