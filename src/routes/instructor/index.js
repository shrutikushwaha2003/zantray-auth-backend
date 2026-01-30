import express from "express";

import coursesRoutes from "./createCourse.route.js";
import feedRoutes from "./feed.route.js";
import annoucementRoutes from "./annoucement.route.js";
import lessonRoutes from "./lesson.route.js";
import moduleRoutes from "./module.route.js";
import customizerRoutes from "./customizer.route.js";


const router =express.Router();

router.use("/courses",coursesRoutes);
router.use("/feed",feedRoutes);
router.use("/announcement",annoucementRoutes);
router.use("/lesson",lessonRoutes);
router.use("/module",moduleRoutes);
router.use("/customizer",customizerRoutes);




export default router;