const express = require("express");
const mongoose = require("mongoose");
const Request = require("../models/Request");
const authMiddleware = require("../middleware/authMiddleware");
const allowedStatuses = require("../constants/requestStatuses");
function createRequestRouter(upload) {
  const router = express.Router();

  function requireMaster(req, res, next) {
    if (req.user.role !== "master") {
      return res.status(403).json({ message: "Только мастер" });
    }
    next();
  }

  function requireClient(req, res, next) {
    if (req.user.role !== "client") {
      return res.status(403).json({ message: "Только клиент может создавать заявку" });
    }
    next();
  }

  const handleMulterUpload = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message || "Ошибка загрузки файла",
        });
      }
      next();
    });
  };

  router.get("/", authMiddleware, async (req, res) => {
    try {
      if (req.user.role === "master") {
        const requests = await Request.find();
        return res.json(requests);
      }

      const requests = await Request.find({
        userId: req.user.id,
      });
      return res.json(requests);
    } catch {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Некорректный идентификатор"
        });
      }
  
      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }

      const ownerMatches =
        request.userId?.toString() === req.user.id;

      if (req.user.role === "client" && !ownerMatches) {
        return res.status(403).json({ message: "Доступ запрещён" });
      }

      res.json(request);
    } catch {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });

  router.post(
    "/",
    authMiddleware,
    requireClient,
    handleMulterUpload,
    async (req, res) => {
      try {
        const { title, description, location } = req.body;

        if (
          typeof title !== "string" ||
          typeof description !== "string" ||
          typeof location !== "string"
        ) {
          return res.status(400).json({
            message: "Неверные данные"
          });
        }

        if (
          !title.trim() ||
          !description.trim() ||
          !location.trim()
        ) {
          return res.status(400).json({
            message: "Все поля обязательны"
          });
        }

        if (title.length > 100) {
          return res.status(400).json({
            message: "Слишком длинный заголовок"
          });
        }

        if (description.length > 2000) {
          return res.status(400).json({
            message: "Слишком длинное описание"
          });
        }

        if (location.length > 100) {
          return res.status(400).json({
            message: "Слишком длинное название помещения"
          });
        }

        const payload = {
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
          userId: new mongoose.Types.ObjectId(req.user.id),
        };

        if (req.file) {
          payload.image = `/uploads/${req.file.filename}`;
        }

        const newRequest = new Request(payload);
        await newRequest.save();
        res.json(newRequest);
      } catch {
        res.status(500).json({ message: "Ошибка при создании" });
      }
    }
  );

  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Некорректный идентификатор"
        });
      }

      const request = await Request.findById(req.params.id);

      if (!request) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }

      if (request.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Удалять может только владелец" });
      }
  
      await Request.findByIdAndDelete(req.params.id);
      res.json({ message: "Заявка удалена" });
    } catch {
      res.status(500).json({ message: "Ошибка при удалении" });
    }
  });

  router.put("/:id", authMiddleware, requireMaster, async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Некорректный идентификатор"
        });
      }

      const { status } = req.body;

      if (typeof status !== "string") {
        return res.status(400).json({ message: "Неверный статус" });
      }

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Недопустимый статус"
        });
      }

      const updated = await Request.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }

      res.json(updated);
    } catch {
      res.status(500).json({ message: "Ошибка обновления" });
    }
  });

  return router;
}

module.exports = createRequestRouter;
