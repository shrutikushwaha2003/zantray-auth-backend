import { Router } from "express";
import auth from "../../../middleware/auth.middleware.js";
import {
  createHero,
  getHeroesAdmin,
  updateHero,
  deleteHero
} from "../../../controllers/admin/home/transform.Contoller.js";

const router = Router();

// CREATE
router.post("/create", auth("admin"), createHero);

// GET ALL
router.get("/get", auth("admin"), getHeroesAdmin);

// UPDATE
router.put("/:id", auth("admin"), updateHero);

// DELETE
router.delete("/:id", auth("admin"), deleteHero);

export default router;
