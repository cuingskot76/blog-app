import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { verify } from "../middleware/verify.js";
import cookieParser from "cookie-parser";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;
