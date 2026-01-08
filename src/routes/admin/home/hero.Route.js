import { Router } from "express";
import auth from "../../../middleware/auth.middleware.js";
import { saveHero, getHeroAdmin } from "../../../controllers/admin/home/hero.Contoller.js";

const router = Router();

// Admin CMS
router.post("/", auth("admin"), saveHero);
router.get("/", auth("admin"), getHeroAdmin);

export default router;
