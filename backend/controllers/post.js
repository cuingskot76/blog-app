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
  // get user id from token
  // const token = req.headers.authorization.split(" ")[1];
  // const decoded = jwt.verify(token, "jwtkey");
  // const userId = decoded.id;

  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE id = ? ";

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post");
    return res.status(200).json("Post deleted");
  });

  // !bener
  // const q = "DELETE FROM posts WHERE id = ?";

  // db.query(q, [req.params.id], (err, data) => {
  //   if (err) return res.json(err);
  //   return res.status(200).json("Post deleted successfully");
  // });

  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Unauthorized");
  // console.log(token);

  // jwt.verify(token, "jwtkey", (err, decoded) => {
  //   if (err) return res.status(401).json("Unauthorized");

  //   const postId = req.params.id;
  //   const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

  //   db.query(q, [postId, decoded.id], (err, data) => {
  //     if (err) return res.status(403).json("You can delete only your post");
  //     return res.status(200).json("Post deleted");
  //   });
  // });
};
