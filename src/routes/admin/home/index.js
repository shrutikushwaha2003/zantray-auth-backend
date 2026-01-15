import { Router } from "express";

import bannerRoutes from "./banner.Route.js";
import howItWorksRoutes from "./howItWorks.Route.js";
import featuresRoutes from "./features.Route.js";
import transformRoutes from "./transform.Route.js";
import socialLinkRoutes from "./socialLink.Route.js";

const router = Router();

router.use("/banner", bannerRoutes);
router.use("/how-it-works", howItWorksRoutes);
router.use("/features", featuresRoutes);
router.use("/transform", transformRoutes);
router.use("/social-link", socialLinkRoutes);

export default router;
