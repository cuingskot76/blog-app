import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/token", refreshToken);

export default router;
