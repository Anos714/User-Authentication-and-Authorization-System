import express from "express";
import { checkAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/home", checkAuthenticated, (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Hello ${req.userInfo.username}`,
  });
});

export const homeRouter = router;
