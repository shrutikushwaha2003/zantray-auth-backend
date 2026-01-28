import express from "express";
import {
    createLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson,
} from "../../controllers/instructor/lesson/lesson.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/:courseId",
    auth("user"),
    role("instructor"),
    upload.single("video"),
    createLesson
);

router.get(
    "/:courseId",
    auth("user"),
    getLessonsByCourse
);

router.put(
    "/:id",
    auth("user"),
    role("instructor"),
    upload.single("video"),
    updateLesson
);

router.delete(
    "/:id",
    auth("user"),
    role("instructor"),
    deleteLesson
);

export default router;
