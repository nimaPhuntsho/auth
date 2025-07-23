import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authSignupRouter from "./routes/register";
import dotenv from "dotenv";
import { requestLogger } from "../../middlwares/requestLogger";

dotenv.config();
const app = express();
const PORT = 3002;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(requestLogger);

app.use("/api/v1/", authSignupRouter);

app.listen(PORT, () => {
  console.log("Redis connected and running !");
  console.log(`Auth service is listening on port ${PORT}`);
});
