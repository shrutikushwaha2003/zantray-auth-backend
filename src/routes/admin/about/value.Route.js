import express from "express";
import auth from "../../../middleware/auth.middleware.js";
import * as valuesController from "../../../controllers/admin/about/values.controller.js";

const router = express.Router();

// SECTION
router.post("/section", auth("admin"), valuesController.upsertSection);
router.get("/section", auth("admin"), valuesController.getSection);

// ITEMS
router.post("/items", auth("admin"), valuesController.createItems);
router.get("/items", auth("admin"), valuesController.getItems);
router.put("/items/:id", auth("admin"), valuesController.updateItem);
router.delete("/items/:id", auth("admin"), valuesController.deleteItem);

export default router;

