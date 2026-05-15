const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const authRoutes = require("./routes/authRoutes");
const createRequestRouter = require("./routes/requestRoutes");

const MONGO_DB_URL = process.env.MONGO_DB_URL;
if (!MONGO_DB_URL) {
  console.error("Задайте MONGO_DB_URL в backend/.env");
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("Задайте JWT_SECRET в backend/.env");
  process.exit(1);
}

const app = express();

const uploadDir = path.join(__dirname, process.env.UPLOADS_DIR || "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "") || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Только изображения"));
    }
    cb(null, true);
  },
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => {
    console.error("MongoDB:", err.message);
    process.exit(1);
  });

app.use("/auth", authRoutes);
app.use("/requests", createRequestRouter(upload));

app.get("/", (req, res) => {
  res.send("API работает");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});