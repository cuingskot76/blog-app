import express from "express";
import { deletePost, getPost, getPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

export default router;
