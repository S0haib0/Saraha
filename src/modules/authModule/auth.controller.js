import { Router } from "express";
import {
  generateAccessToken,
  getUserById,
  login,
  signup,
} from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/responses/success.response.js";
import { auth } from "../../common/middleware/auth.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { validation } from "../../common/utils/validation.js";
import { multer_local } from "../../common/middleware/multer.js";

const router = Router();

router.post(
  "/signup",
  multer_local().single("image"),
  validation(signupSchema),
  async (req, res) => {
    let addedUser = await signup(req.body, req.file);
    SuccessResponse({
      res,
      message: "user added",
      status: 201,
      data: addedUser,
    });
  },
);
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

router.get("/get-access-token", async (req, res) => {
  let accessToken = await generateAccessToken(req.headers.authorization);
  return SuccessResponse({
    res,
    message: "access token created",
    status: 200,
    data: accessToken,
  });
});
router.post("/signup/gmail", async (req, res) => {
  const data = await signupMail(req.body);
  return SuccessResponse({
    res,
    message: "user added with gmail",
    status: 200,
  });
});

export default router;
