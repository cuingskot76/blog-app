import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  // * if we use postman to test the api, we need to add the token in the header
  // const authHeader = req.headers.authorization;
  // const token = authHeader.split(" ")[1];

  try {
    const token = req.cookies.accessTokenKey;
    console.log(token);
    if (!token) return res.status(401).json("You are not authenticated");

    jwt.verify(token, "accessTokenKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json("You are not authenticated");
  }
};
