import express from "express";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auths.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

// app.use(cors({ credentials: true }));
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
};

// * if the FE is running on http://127.0.0.1:5173
// const corsOptions = {
//   origin: ["http://127.0.0.1:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"],
//   credentials: true,
// };

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    // return res.status(200).json("File uploaded successfully");
    return res.status(200).json(file?.filename);
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8000, () => {
  console.log("Connected at port 8000");
});
