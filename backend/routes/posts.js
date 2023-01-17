import express from "express";
// import { verify } from "jsonwebtoken";
import { deletePost, getPost, getPosts } from "../controllers/post.js";
import { verify } from "../middleware/verify.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.delete("/:id", verify, deletePost);
router.get("/", getPosts);
// router.get("/", verifyToken, getPosts);
router.get("/:id", getPost);

export default router;
