import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({});
export const messageModel = mongoose.model("Message", messageSchema);
