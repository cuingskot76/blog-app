import express from "express";
// import { verify } from "jsonwebtoken";
import { addPost, deletePost, getPost, getPosts } from "../controllers/post.js";
import { verify } from "../middleware/verify.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
// router.get("/", verifyToken, getPosts);
router.get("/:id", getPost);
router.delete("/:id", verify, deletePost);
router.post("/", addPost);

export default router;
