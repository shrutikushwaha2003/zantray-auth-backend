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

const router = express.Router();

// Create Course
router.post("/", auth("user"), role("instructor"), createCourse);

// Get All Courses
router.get("/", auth("user"), role("instructor"), getInstructorCourses);

// Get Stats
router.get("/stats", auth("user"), role("instructor"), getCourseStats);

// Update Course
router.put("/:id", auth("user"), role("instructor"), updateCourse);

// Delete Course
router.delete("/:id", auth("user"), role("instructor"), deleteCourse);

export default router;
