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

    const accessToken = jwt.sign(
      { id: data[0].id, email: data[0].email, firstName: data[0].firstName },
      "accessTokenKey",
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { id: data[0].id, email: data[0].email, firstName: data[0].firstName },
      "refreshTokenKey",
      {
        expiresIn: "1d",
      }
    );

    // store the refresh token in the database
    const q = "UPDATE users SET refresh_token = ? WHERE id = ?";
    db.query(q, [refreshToken, data[0].id], (err, data) => {
      if (err) return res.status(500).json("Something went wrong");
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  });
};

export const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) return res.status(401).json("Unauthorized");

  const q = "UPDATE users SET refresh_token = ?";
  db.query(q, [null], (err, data) => {
    if (err) return res.status(500).json("Something went wrong");

    // clear the cookies
    res
      .clearCookie("refreshToken")
      .status(200)
      .json("User has been logged out and refresh token has been deleted");
  });
};
