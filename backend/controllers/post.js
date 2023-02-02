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

  // only get posts title, subTitle, img, date, cat, writter, description
  // const q = req.query.cat
  //   ? "SELECT title, subTitle, img, date, cat, writter, description FROM posts WHERE cat = ?"
  //   : "SELECT title, subTitle, img, date, cat, writter, description FROM posts";

  // req.query.cat
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, writter, title, subTitle, p.img, description, u.email ,u.img AS userImg, cat, p.date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

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

  // !bener
  const q = "DELETE FROM posts WHERE id = ?";
  // console.log(req.params.id);

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Post deleted successfully");
  });

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

export const addPost = (req, res) => {
  // create query with title, subTitle, img, description, cat, date, uid, writter from req.body
  const q = "INSERT INTO posts SET ?";
  const post = {
    title: req.body.title,
    subTitle: req.body.subTitle,
    img: req.body.img,
    description: req.body.description,
    cat: req.body.cat,
    date: req.body.date,
    writter: req.body.writter,
    uid: req.body.uid,
  };

  // execute query
  db.query(q, post, (err, data) => {
    if (err) return res.status(403).json("Post not added");
    return res.status(200).json("Post added successfully");
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.accessTokenKey;
  // console.log(token);
  if (!token) return res.status(401).json("You are not authenticated");

  jwt.verify(token, "accessTokenKey", (err, user) => {
    if (err) return res.status(403).json("Token is not valid");
    const postId = req.params.id;
    const userId = user?.id;
    const q =
      "UPDATE posts SET title=?, subTitle=?, img=?, description=?, cat=? WHERE id = ? AND uid = ?";
    const values = [
      req.body.title,
      req.body.subTitle,
      req.body.img,
      req.body.description,
      req.body.cat,
      postId,
      userId,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been updated");
    });
  });

  // !bener
  // const postId = req.params.id;
  // const q =
  //   "UPDATE posts SET title=?, subTitle=?, img=?, description=?, cat=? WHERE id = ?";
  // const values = [
  //   req.body.title,
  //   req.body.subTitle,
  //   req.body.img,
  //   req.body.description,
  //   req.body.cat,
  //   postId,
  // ];
  // db.query(q, values, (err, data) => {
  //   console.log(err);
  //   if (err) return res.status(403).json("Post not updated");
  //   return res.status(200).json("Post updated successfully");
  // });
};
