import express from "express";
import { checkAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/products", checkAuthenticated, (req, res) => {
  return res.status(200).json([
    {
      product: "mobile",
      price: "10000",
    },
    {
      product: "TV",
      price: "25000",
    },
  ]);
});

export const productRouter = router;
