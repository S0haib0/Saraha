import { model } from "mongoose";
import { messageModel } from "../../database/model/message.model.js";
import { BadRequestException } from "../../common/utils/responses/error.response.js";
import {
  findAll,
  findById,
  findOne,
  findOneAndDelete,
  insertOne,
} from "../../database/database.service.js";

export const sendMessage = async (data, userId) => {
  let { message, image } = data;
  let existUser = await findById({ model: userModel, id: userId });
  if (!existUser) {
    throw BadRequestException({ message: "User not found" });
  }
  let newMessage = await insertOne({
    model: messageModel,
    data: { message, image, receiver: userId },
  });
  if (newMessage) {
    return newMessage;
  } else {
    throw BadRequestException({ message: "Failed to send message" });
  }
};

export const getAllMessages = async (userId) => {
  let exisstUser = await findById({ model: userModel, id: userId });
  if (!exisstUser) {
    throw BadRequestException({ message: "User not found" });
  }
  let messages = await findAll({
    model: messageModel,
    filter: { receiver: userId },
  });
  if (!messages.length) {
    throw BadRequestException({ message: "No messages found" });
  } else {
    return messages;
  }
};

export const getMessageById = async (messageId, userId) => {
  let message = await findOne({
    model: messageModel,
    filter: { _id: messageId, receiver: userId },
  });
  if (!message) {
    throw BadRequestException({ message: "Message not found" });
  } else {
    return message;
  }
};

export const deleteMessageById = async (messageId, userId) => {
  let deletedMessage = await findOneAndDelete({
    model: messageModel,
    filter: { _id: messageId, receiver: userId },
  });
  if (!deletedMessage) {
    throw BadRequestException({ message: "Message not found" });
  } else {
    return deletedMessage;  
  }
};
