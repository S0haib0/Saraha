import { Router } from "express";
import { generateAccessToken, getUserById, login, signup } from "./auth.service.js";
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

router.get("/generate-access=token", async (req, res) => {
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
