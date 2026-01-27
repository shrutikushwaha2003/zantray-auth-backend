import express from "express";
import {
    createLecture,
    getLecturesByCourse,
    updateLecture,
    deleteLecture,
} from "../../controllers/instructor/lecture/lecture.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/:courseId",
    auth("user"),
    role("instructor"),
    upload.single("video"),
    createLecture
);

router.get(
    "/:courseId",
    auth("user"),
    getLecturesByCourse
);

router.put(
    "/:id",
    auth("user"),
    role("instructor"),
    upload.single("video"),
    updateLecture
);

router.delete(
    "/:id",
    auth("user"),
    role("instructor"),
    deleteLecture
);

export default router;
