import express from "express";
import {
  createCourse,
  getInstructorCourses,
  deleteCourse,
} from "../../controllers/instructor/courses/course.controller.js";

import auth from "../../middlewares/auth.middleware.js";
import role from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", auth, role("instructor"), createCourse);
router.get("/", auth, role("instructor"), getInstructorCourses);
router.delete("/:id", auth, role("instructor"), deleteCourse);

export default router;
