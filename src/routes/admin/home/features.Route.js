import { Router } from "express";
import auth from "../../../middleware/auth.middleware.js";
import {
  saveSection,
  createItem,
  getItemsAdmin,
  updateItem,
  deleteItem
} from "../../../controllers/admin/home/features.Controller.js";

const router = Router();

router.post("/section", auth("admin"), saveSection);
router.post("/items", auth("admin"), createItem);
router.get("/items", auth("admin"), getItemsAdmin);
router.put("/items/:id", auth("admin"), updateItem);
router.delete("/items/:id", auth("admin"), deleteItem);

export default router;
