import { Router } from "express";
import {
  generateAccessToken,
  getUserById,
  login,
  signup,
} from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/responses/success.response.js";
import multer from "multer";
import { auth } from "../../common/middleware/auth.js";
import joi from "joi";
import { BadRequestException } from "../../common/utils/responses/error.response.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { validation } from "../../common/utils/validation.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/signup", validation(signupSchema), async (req, res) => {
  let addedUser = await signup(req.body);
  SuccessResponse({ res, message: "user added", status: 201, data: addedUser });
});
router.post("/login", validation(loginSchema), async (req, res) => {
  let loginUser = await login(req.body);
  SuccessResponse({
    res,
    message: "user logged in successfully",
    status: 200,
    data: loginUser,
  });
});
router.get("/get-user-by-id", auth, async (req, res) => {
  let userData = await getUserById(req.userId);
  res.json(userData);
});

router.get("/generate-access-token", async (req, res) => {
  let { authorization } = req.headers;
  let accessToken = await generateAccessToken(authorization);
  return SuccessResponse({
    res,
    message: "access token created",
    status: 200,
    data: accessToken,
  });
});

export default router;
