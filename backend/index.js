const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const Request = require("./models/Request");

const MONGO_DB_URL = process.env.MONGO_DB_URL;
if (!MONGO_DB_URL) {
  console.error("Задайте MONGO_DB_URL в backend/.env");
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

mongoose.connect(MONGO_DB_URL)
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => {
    console.error("MongoDB:", err.message);
    process.exit(1);
  });

app.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.get("/requests/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.post("/requests", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "Ошибка загрузки файла" });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, description, location, userId } = req.body;
    const payload = {
      title,
      description,
      location,
      userId: userId || "test-user",
    };
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }
    const newRequest = new Request(payload);
    await newRequest.save();
    res.json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании" });
  }
});

app.delete("/requests/:id", async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.json({ message: "Заявка удалена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении" });
  }
});

app.put("/requests/:id", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления" });
  }
});
// тестовый маршрут
app.get("/", (req, res) => {
  res.send("API работает");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});