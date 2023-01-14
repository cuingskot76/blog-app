import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // check if user email exist
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Email alredy exist");

    // hash the user password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(`firstName`, `lastName`, `email`, `password`) VALUES (?)";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hash,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Register successfully");
    });
  });
};

export const login = (req, res) => {
  // check if user email exist
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    // if (!data.length) return res.status(404).json("Email not found");
    if (data.length === 0) return res.status(404).json("Email not found");

    // compare the user password
    const validPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!validPassword) return res.status(401).json("Invalid password");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    // return res.status(200).json("Login successfully");
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
