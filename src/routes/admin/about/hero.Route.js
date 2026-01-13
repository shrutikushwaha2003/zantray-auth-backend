import express from "express";
import * as heroController from "../../../controllers/admin/about/hero.Controller.js";
import auth from "../../../middleware/auth.middleware.js";

const router = express.Router();

// CRUD
router.post("/", auth("admin"), heroController.createHero);
router.get("/", auth("admin"),heroController.getHeroes);
router.get("/:id",auth("admin"), heroController.getHero);
router.put("/:id", auth("admin"), heroController.updateHero);
router.delete("/:id", auth("admin"), heroController.deleteHero);

export default router;
