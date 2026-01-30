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

router.post(
  "/",
  auth("user"),
  role("instructor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "introVideo", maxCount: 1 }
  ]),
  createCourse
);

router.get(
  "/stats",
  auth("user"),
  role("instructor"),
  getCourseStats
);

router.get(
  "/:id/full",
  auth("user"),
  role("instructor"),
  getFullCourseTree
);

router.patch(
  "/:id/publish",
  auth("user"),
  role("instructor"),
  publishCourse
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
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "introVideo", maxCount: 1 }
  ]),
  updateCourse
);

router.delete(
  "/:id",
  auth("user"),
  role("instructor"),
  deleteCourse
);

export default router;
