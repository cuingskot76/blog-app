import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  // agar sesuai dengan tab query "/?cat=...", pakenya "query"
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";
  //   const q = req.body.cat
  //     ? "SELECT * FROM posts WHERE cat = ?"
  //     : "SELECT * FROM posts";

  // req.query.cat
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT writter, title, subTitle, p.img, description, u.email ,u.img AS userImg, cat, p.date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  // params = id in the url
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {
  // "access_token" = nama tokennya
  const token = req.cookies.access_token;
  // const token = req.body.token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req?.params?.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo?.id], (err, data) => {
      if (err) res.status(403).json("You can delete only your post");

      return res.json("Post has been deleted");
    });
  });
};
