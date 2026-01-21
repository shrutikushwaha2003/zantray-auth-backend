import express from "express";

import heroAppRoutes from "../../../routes/app/about/hero.app.route.js";
import storyAppRoutes from "../../../routes/app/about/story.app.route.js";
import teamAppRoutes from "../../../routes/app/about/team.app.route.js";
import valueAppRoutes from "../../../routes/app/about/value.app.route.js";
import milestoneAppRoutes from "../../../routes/app/about/milestone.app.route.js";






const router = express.Router();

router.use("/hero",heroAppRoutes);
router.use("/story",storyAppRoutes);
router.use("/team",teamAppRoutes);
router.use("/value",valueAppRoutes);
router.use("/milestone",milestoneAppRoutes);




export default router;