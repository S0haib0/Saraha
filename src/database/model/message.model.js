import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
  },
  receiver: {
    type: new mongoose.Types.ObjectId(),
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  userId: {
    type: new mongoose.Types.ObjectId(),
    required: false,
  },
});
export const messageModel = mongoose.model("Message", messageSchema);
