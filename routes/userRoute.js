import express from "express";

import {
  loginUser,
  registerUser,
  logout,
  forgotPassword,
} from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").get(logout);

userRouter.route("/password/forgot").post(forgotPassword);

export default userRouter;
