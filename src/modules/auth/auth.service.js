import { providerEnums } from "../../common/enums/enum.service.js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/utils/responses/error.response.js";
import {
  findById,
  findOne,
  findOneAndUpdate,
} from "../../database/database.service.js";
import { userModel } from "../../database/index.js";
import { generateHash, compareHash } from "../../common/index.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
import { generateToken } from "../../common/security/security.js";
import { OAuth2Client } from "google-auth-library";
import { createRevokeKey } from "../../database/redis.service.js";
import { get } from "../../database/redis.service.js";
import { event } from "../../common/utils/email/email.events.js";

export const signup = async (data, file) => {
  let { userName, email, password, shareProfile } = data;
  let existUser = await findOne({ model: userModel, filter: { email } });
  if (existUser) {
    return ConflictException({ message: "user already exists" });
  }
  let image = "";
  if (file) {
    image = `${env.baseURl}/uploads/${file.filename}`;
  }
  let hashedPassword = await generateHash(password);
  let addedUser = await userModel.insertOne({
    userName,
    email,
    password: hashedPassword,
    shareProfile,
    image,
  });
  event.emit("verifyEmail", { userId: addedUser._id, email });

  return addedUser;
};

export const verifyEmail = async ({ code, email }) => {
  let user = await findOne({ model: userModel, filter: { email } });
  if (!user) {
    return NotFoundException({ message: "user not found" });
  }
  let redisCode = await get({ key: `otp::${user._id}` });
  if (await compareHash(code, redisCode)) {
    await findOneAndUpdate({
      model: userModel,
      filter: { _id: user._id },
      update: { isVerified: true },
      options: { new: true },
    });
  } else {
    return BadRequestException({ message: "invalid code" });
  }
  return user;
};

export const login = async (data) => {
  let { email, password } = data;

  let existUser = await findOne({
    model: userModel,
    filter: { email, provider: providerEnums.System },
  });

  if (existUser) {
    let { token, refreshToken } = generateToken(existUser);
    const isMatched = await compareHash(password, existUser.password);
    if (isMatched) {
      return { existUser, token, refreshToken };
    }
  }
  return NotFoundException({ message: "user not found" });
};

export const getUserById = async (headers) => {
  let userData = await findById({ model: userModel, id: userId });
  return userData;
};
export const signupMail = async (token) => {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token.idToken,
    audience:
      "397742342394-j3iakp0k0ns8vt2t94hloamipl4o2ma8.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
};

export const generateAccessToken = (refreshToken) => {
  let decodedData = decodeRefreshToken(refreshToken);
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

export const logout = async (req) => {
  let redisKey = createRevokeKey({ req });
  set({ key: redisKey, value: 1, ttl: req.decodedData.iat + 30 * 60 });
};
