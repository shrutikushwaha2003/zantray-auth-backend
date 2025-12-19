import express from "express";
import { signup, login } from "../controllers/auth.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
