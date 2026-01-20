import express from "express";
import {
  createTeamMember,
  getTeams,
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../../controllers/admin/about/team.controller.js";

import upload from "../../../middleware/upload.middleware.js";
import auth from "../../../middleware/auth.middleware.js";

const router = express.Router();

/* CREATE */
router.post(
  "/",
  auth("admin"),
  upload.single("image"),
  createTeamMember
);

/* READ ALL */
router.get(
  "/",
  auth("admin"),
  getTeams
);

/* READ ONE */
router.get(
  "/:id",
  auth("admin"),
  getTeamMember
);

/* UPDATE */
router.put(
  "/:id",
  auth("admin"),
  upload.single("image"),
  updateTeamMember
);

/* DELETE */
router.delete(
  "/:id",
  auth("admin"),
  deleteTeamMember
);

export default router;
