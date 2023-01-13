import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auths.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8000, () => {
  console.log("Connected at port 8000");
});
