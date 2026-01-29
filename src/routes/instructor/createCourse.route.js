import express from "express";
import {
  createCourse,
  getInstructorCourses,
  updateCourse,
  deleteCourse,
  getCourseStats,
  getFullCourseTree,
  publishCourse,
} from "../../controllers/instructor/courses/createCourses.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

/* ================= CREATE COURSE (Nested + Thumbnail) ================= */
router.post(
  "/",
  auth("user"),
  role("instructor"),
  upload.single("thumbnail"),
  createCourse
);

/* ================= COURSE STATS ================= */
router.get(
  "/stats",
  auth("user"),
  role("instructor"),
  getCourseStats
);

/* ================= FULL COURSE TREE ================= */
router.get(
  "/:id/full",
  auth("user"),
  role("instructor"),
  getFullCourseTree
);

/* ================= PUBLISH COURSE ================= */
router.patch(
  "/:id/publish",
  auth("user"),
  role("instructor"),
  publishCourse
);

/* ================= GET ALL COURSES ================= */
router.get(
  "/",
  auth("user"),
  role("instructor"),
  getInstructorCourses
);

/* ================= UPDATE COURSE ================= */
router.put(
  "/:id",
  auth("user"),
  role("instructor"),
  upload.single("thumbnail"),
  updateCourse
);

/* ================= DELETE COURSE ================= */
router.delete(
  "/:id",
  auth("user"),
  role("instructor"),
  deleteCourse
);

export default router;
