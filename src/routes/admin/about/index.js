import { Router } from "express";
import heroRoutes from "./hero.Route.js";
import storyRoute from "./story.Route.js";
import milestoneRoute from "./milestone.Route.js"

const router = Router();

router.use("/hero", heroRoutes);
router.use("/story",storyRoute);
router.use("/milestone",milestoneRoute);

export default router;
