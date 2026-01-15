import { Router } from "express";
import auth from "../../../middleware/auth.middleware.js";
import * as milestoneController from "../../../controllers/admin/about/milestone.Controller.js";

const router = Router();

router.post("/section", auth("admin"), milestoneController.upsertSection);
router.post("/items", auth("admin"), milestoneController.createItems);
router.get("/", milestoneController.getAll);
router.put("/item/:id", auth("admin"), milestoneController.updateItem);
router.delete("/item/:id", auth("admin"), milestoneController.deleteItem);

export default router;
