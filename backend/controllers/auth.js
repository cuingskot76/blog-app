import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  // check if user email exist
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Email alredy exist");

    // hash the user password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users('username', 'email', 'password')";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return data.status(200).json("Register successfully");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
