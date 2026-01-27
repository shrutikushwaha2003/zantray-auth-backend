import express from "express";

import coursesRoutes from "./courses.route.js";
import feedRoutes from "./feed.route.js";
import annoucementRoutes from "./annoucement.route.js";
import lectureRoutes from "./lecture.route.js";
import moduleRoutes from "./module.route.js"


const router =express.Router();

router.use("/courses",coursesRoutes);
router.use("/feed",feedRoutes);
router.use("/annoucement",annoucementRoutes);
router.use("/lecture",lectureRoutes);
router.use("/module",moduleRoutes)



export default router;