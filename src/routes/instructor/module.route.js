import express from "express";
import {
  createModule,
  getModulesByCourse,
  deleteModule,
} from "../../controllers/instructor/module/module.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";

const router = express.Router();

/* Create Module */
router.post(
  "/:courseId",
  auth("user"),
  role("instructor"),
  createModule
);

/* Get Modules By Course */
router.get(
  "/:courseId",
  auth("user"),
  getModulesByCourse
);

/* Delete Module */
router.delete(
  "/:id",
  auth("user"),
  role("instructor"),
  deleteModule
);

export default router;
