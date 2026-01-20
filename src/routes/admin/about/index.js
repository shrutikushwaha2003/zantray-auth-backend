import { Router } from "express";
import heroRoutes from "./hero.Route.js";
import storyRoute from "./story.Route.js";
import milestoneRoute from "./milestone.Route.js"
import valuesRoutes from "./value.Route.js";
import teamRoutes from "./team.route.js";

const router = Router();

router.use("/hero", heroRoutes);
router.use("/story",storyRoute);
router.use("/milestone",milestoneRoute);
router.use("/values",valuesRoutes);
router.use("/teams",teamRoutes);

export default router;
