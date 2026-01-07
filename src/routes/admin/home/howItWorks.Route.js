import express from "express";
import auth from "../../../middleware/auth.middleware.js";
import {
  saveSection,
  createStep,
  getStepsAdmin,
  updateStep,
  deleteStep,
} from "../../../controllers/admin/home/howItWorks.Controller.js";

const router = express.Router();

// SECTION (single record)
router.post("/section", auth("admin"), saveSection);

// STEPS
router.post("/steps", auth("admin"), createStep);
router.get("/steps", auth("admin"), getStepsAdmin);
router.put("/steps/:id", auth("admin"), updateStep);
router.delete("/steps/:id", auth("admin"), deleteStep);

export default router;
