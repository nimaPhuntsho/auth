import express from "express";
import * as auth from "../controllers/authController";

const { register, signIn, logout, getSession } = auth;

const router = express.Router();
router.post("/register", register);
router.post("/signin", signIn);
router.get("/logout", logout);
router.get("/session", getSession);

export default router;
