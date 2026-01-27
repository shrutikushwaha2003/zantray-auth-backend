import express from "express";

import coursesRoutes from "./courses.route.js";
import feedRoutes from "./feed.route.js";
import annoucementRoutes from "./annoucement.route.js";

const router =express.Router();

router.use("/courses",coursesRoutes);
router.use("/feed",feedRoutes);
router.use("/annoucement",annoucementRoutes);



export default router;