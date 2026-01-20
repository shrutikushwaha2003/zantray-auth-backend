import express from "express";
import * as heroController from "../../../controllers/admin/about/hero.Controller.js";
import auth from "../../../middleware/auth.middleware.js";
import upload from "../../../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", auth("admin"), upload.single("image"), heroController.createHero);
router.get("/", heroController.getHero);
router.put("/", auth("admin"), upload.single("image"), heroController.updateHero);
router.delete("/", auth("admin"), heroController.deleteHero);

export default router;
