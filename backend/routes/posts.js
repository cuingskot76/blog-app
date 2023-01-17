import express from "express";
// import { verify } from "jsonwebtoken";
import { deletePost, getPost, getPosts } from "../controllers/post.js";
import { verify } from "../middleware/verify.js";

const router = express.Router();

router.delete("/:id", deletePost);
router.get("/", getPosts);
router.get("/:id", getPost);

export default router;
