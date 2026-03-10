import { userModel } from "../../database/model/user.model.js";
import {
  findOne,
  findOneAndDelete,
  findOneAndUpdate,
} from "../../database/database.service.js";
import { BadRequestException } from "../../common/utils/responses/error.response.js";
import { env } from "../../../config/index.js";

export const getUserProfile = async (userId) => {
  let userData = await findOne({
    model: userModel,
    filter: { _id: userId },
    select: "firstName lastName shareProfile image",
  });
  if (!userData) {
    throw BadRequestException({ message: "user not found" });
  }
  return userData;
};

export const shareProfileLink = async (userId) => {
  let userData = await findOne({
    model: userModel,
    filter: { _id: userId },
    select: "firstName lastName shareProfile",
  });
  if (!userData) {
    throw BadRequestException({ message: "user not found" });
  }
  let url = `${env.baseURl}/${userData.shareProfile}`;
};
export const getUserData = async (data) => {
  let { shareProfile } = data;
  let userLink = shareProfile.split("/")[3];
  let userData = await findOne({
    model: userModel,
    filter: { shareProfile: userLink },
    select: "firstName lastName email",
  });
  if (userData) {
    return userData;
  }
  throw BadRequestException("user not found");
};
export const updateProfile = async (userId, data, file) => {
  let { firstName, lastName, gender, phone } = data;
  let updatedData = {};
  firstName ? (updatedData.firstName = firstName) : null;
  lastName ? (updatedData.lastName = lastName) : null;
  gender ? (updatedData.gender = gender) : null;
  phone ? (updatedData.phone = phone) : null;

  let image = "";
  if (file) {
    image = `${env.baseURl}/upload${file.filename}`;
  }
  data.image = image;
  let existUser = await findOneAndUpdate({
    model: userModel,
    filter: { _id: userId },
    update: { updatedData },
  });
  if (!existUser) {
    throw BadRequestException("user not found");
  }
  return existUser;
};

export const deleteProfile = async (userId) => {
  let deletedUser = await findOneAndDelete({
    model: userModel,
    filter: { _id: userId },
  });
  if (deletedUser) {
    return deletedUser;
  }
  throw BadRequestException("user not found");
};
