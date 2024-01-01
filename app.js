import express from "express";
import cors from "cors";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

import { middleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
// Products Apis
app.use("/api", productRouter);

app.use("/api/auth", userRouter);

//Error handler middleware
app.use(middleware);

export default app;

