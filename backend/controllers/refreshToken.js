import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    // const refreshToken = req.cookies.accessTokenKey;

    // ambil refresh token dari body
    const refreshToken = req.body.token;
    // console.log(refreshToken);
    if (!refreshToken) return res.status(401).json("Unauthorized");

    // compare the refresh token with the one in the database
    const q = "SELECT * FROM users WHERE refresh_token = ?";
    db.query(q, [refreshToken], (err, data) => {
      if (err) return res.json(err);
      if (!data.length) return res.status(403).json("Forbidden");

      // verify the refresh token
      jwt.verify(refreshToken, "refreshTokenKey", (err, decoded) => {
        if (err) return res.status(403).json("Forbidden");

        // get the user id, firstName, email from the decoded refresh token
        const userId = decoded.id;
        const firstName = decoded.firstName;
        const email = decoded.email;

        // create a new access token
        const accessToken = jwt.sign(
          { userId, firstName, email },
          "accessTokenKey",
          {
            expiresIn: "20s",
          }
        );

        // send the new access token to the client
        res.status(200).json({ accessToken });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
