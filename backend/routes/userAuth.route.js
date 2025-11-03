import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import {
  registerValidate,
  loginValidate,
} from "../middlewares/validation.middleware.js";
const router = express.Router();

router.post("/register", registerValidate, registerUser);
router.post("/login", loginValidate, loginUser);

export const authRouter = router;
