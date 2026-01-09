import { Router } from "express";
import auth from "../../../middleware/auth.middleware.js";
import {
  createSocialLink,
  getSocialLinks,
  updateSocialLink,
  deleteSocialLink
} from "../../../controllers/admin/home/socialLink.Controller.js";

const router = Router();

router.post("/", auth("admin"), createSocialLink);
router.get("/", auth("admin"), getSocialLinks);
router.put("/:id", auth("admin"), updateSocialLink);
router.delete("/:id", auth("admin"), deleteSocialLink);

export default router;
