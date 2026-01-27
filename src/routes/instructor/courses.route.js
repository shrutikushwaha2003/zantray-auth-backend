import express from "express";
import {
  createCourse,
  getInstructorCourses,
  updateCourse,
  deleteCourse,
  getCourseStats,
} from "../../controllers/instructor/courses/courses.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  role("instructor"),
  upload.single("thumbnail"),
  createCourse
);

router.get(
  "/stats",
  auth("user"),
  role("instructor"),
  getCourseStats
);

router.get(
  "/",
  auth("user"),
  role("instructor"),
  getInstructorCourses
);

router.put(
  "/:id",
  auth("user"),
  role("instructor"),
  upload.single("thumbnail"),
  updateCourse
);

router.delete(
  "/:id",
  auth("user"),
  role("instructor"),
  deleteCourse
);

export default router;
