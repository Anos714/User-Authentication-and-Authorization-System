import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./database/db.js";
import { authRouter } from "./routes/userAuth.route.js";
import { productRouter } from "./routes/products.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { homeRouter } from "./routes/home.route.js";
const app = express();

//database connection
connectToDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//express routes
app.use("/api/auth", authRouter);
app.use("/api", productRouter);
app.use("/api", adminRouter);
app.use("/api", homeRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at PORT : ${PORT}`);
});
