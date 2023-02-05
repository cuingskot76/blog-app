import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  try {
    // const token = req.cookies.accessTokenKey;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json("You are not authenticated");

    jwt.verify(token, "accessTokenKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.email = user.email;
      next();
    });
  } catch (error) {
    return res.status(401).json("You are not authenticated");
  }
};
