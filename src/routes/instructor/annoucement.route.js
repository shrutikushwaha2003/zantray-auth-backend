import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../controllers/instructor/annoucement/annoucement.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/", auth("user"), role("instructor"), createAnnouncement);
router.get("/", auth("user"), getAnnouncements);
router.put("/:id", auth("user"), role("instructor"), updateAnnouncement);
router.delete("/:id", auth("user"), role("instructor"), deleteAnnouncement);

export default router;
