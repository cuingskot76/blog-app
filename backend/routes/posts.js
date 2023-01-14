import express from "express";
import { getPost, getPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
// router.post("/");
// router.delete("/:id");

export default router;
