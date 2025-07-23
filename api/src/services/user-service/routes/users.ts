import express, { Request, Response } from "express";
import { signUp } from "../controllers/userControllers";
const router = express.Router();

router.get("/users", (req: Request, res: Response) => {
  res.json({
    message: "this data is coming from user service",
  });
});

router.post("/api/signup", signUp);

export default router;
