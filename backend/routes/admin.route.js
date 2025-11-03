import express from "express";
import { checkAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/admin", checkAuthenticated, (req, res) => {
  if (req.userInfo.role !== "admin") {
    return res.status(401).json({
      success: false,
      mesage: "Admin Authorization needed",
    });
  }

  return res.status(200).json({
    success: true,
    message: "hello Admin",
  });
});

export const adminRouter = router;
