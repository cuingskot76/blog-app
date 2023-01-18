import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "accessTokenKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
  //   const token = req.headers.authorization;
  //   if (!token) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }
  //   try {
  //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
  //     req.user = decoded;
  //     next();
  //   } catch (err) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }
};
