import { Router } from "express";
import { getUserById, signup } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/responses/success.response.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = Router();
router.post("/signup", upload.array("photos", 12), async (req, res) => {
  let addedUser = await signup(req.body);
  SuccessResponse({ res, message: "user added", status: 201, data: addedUser });
});
router.post("/login", async (req, res) => {
  let loginUser = await login(req.body);
  SuccessResponse({
    res,
    message: "user logged in successfully",
    status: 200,
    data: loginUser,
  });
});
router.get("/get-user-by-id", async (req, res) => {
  let userData = await getUserById(req.headers);
  res.json(userData);
});

export default router;
