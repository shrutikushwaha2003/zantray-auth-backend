import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../controllers/instructor/annoucement/annoucement.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  role("instructor"),
upload.fields([
  { name: "image", maxCount: 1 }
]),
  createAnnouncement
);

router.put(
  "/:id",
  auth("user"),
  role("instructor"),
  upload.single("image"),
  updateAnnouncement
);


router.get(
  "/",
  auth("user"),
  getAnnouncements
);



router.delete(
  "/:id",
  auth("user"),
  role("instructor"),
  deleteAnnouncement
);

export default router;
