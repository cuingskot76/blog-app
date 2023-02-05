import express from "express";
// import { verify } from "jsonwebtoken";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";
import { verify } from "../middleware/verify.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", verify, deletePost);
router.post("/", verify, addPost);
router.put("/:id", verify, updatePost);

export default router;
