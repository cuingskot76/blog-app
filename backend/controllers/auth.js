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
    if (data.length === 0) return res.status(404).json("Email not found");

    // compare the user password
    const validPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!validPassword) return res.status(401).json("Invalid password");

    const accessToken = jwt.sign({ id: data[0].id }, "accessTokenKey", {
      expiresIn: "20s",
    });

    const refreshToken = jwt.sign({ id: data[0].id }, "refreshTokenKey", {
      expiresIn: "1d",
    });

    // refresh_token = from database
    const { password, refresh_token, ...user } = data[0];
    const newUser = { ...user, accessToken, refreshToken };

    // store the refresh token in the database
    const q = "UPDATE users SET refresh_token = ? WHERE id = ?";
    db.query(q, [newUser.refreshToken, data[0].id], (err, data) => {
      if (err) return res.status(500).json("Something went wrong");
    });

    res
      .cookie("accessTokenKey", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(newUser);
  });
};

export const logout = (req, res) => {
  // delete the refresh token from the database
  const q = "UPDATE users SET refresh_token = ?";
  // console.log(req.body.id, req.userId);
  db.query(q, [null], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");
    // res.status(200).json("Successfully delete the refresh token");
  });

  res
    .clearCookie("accessTokenKey", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out and refresh token has been deleted");
};
