import express, { json } from "express";
import cors from "cors";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser";

import { authMiddleware } from "../auth-service/middlewares/authMiddlware";

const app = express();
app.use(cookieParser());
const PORT = 3001;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", authMiddleware, userRouter);

app.listen(PORT, () => {
  console.log(`User service is running on PORT ${PORT} ...`);
});
