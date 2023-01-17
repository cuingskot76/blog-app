import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json("Unauthorized");

  jwt.verify(token, "accessTokenKey", (err, decoded) => {
    if (err) return res.status(403).json("Forbidden");
    // variabel name
    req.userId = decoded.id;
    next();
  });
};
