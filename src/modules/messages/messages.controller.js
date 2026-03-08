import { Router } from "express";
import { SuccessResponse } from "../../common/utils/responses/success.response.js";
import {
  deleteMessageById,
  getAllMessages,
  getMessageById,
  sendMessage,
} from "./messages.service.js";
import { validation } from "../../common/utils/validation.js";
import { auth } from "../../common/middleware/auth.js";

const router = Router();

router.post("/send/:id", validation(sendMessageSchema), async (req, res) => {
  let sentMessage = await sendMessage(req.body, req.params.id);
  SuccessResponse({
    res,
    message: "Message sent successfully",
    statusCode: 200,
    data: sentMessage,
  });
});

router.get("/get-all-messages", auth, async (req, res) => {
  let messages = await getAllMessages(req.user.id);
  SuccessResponse({
    res,
    message: "Messages fetched successfully",
    statusCode: 200,
    data: messages,
  });
});
router.get("get-message-by-id", auth, async (req, res) => {
  let message = await getMessageById(req.body.id, req.user.id);
  SuccessResponse({
    res,
    message: "Message fetched successfully",
    statusCode: 200,
    data: message,
  });
});
router.delete("delete-message/:id",auth , async (req, res) => {
  let deletedMessage = await deleteMessageById(req.params.id, req.user.id);
  SuccessResponse({
    res,
    message: "Message deleted successfully",
    statusCode: 200,
    data: deletedMessage,
  });
});
export default router;
