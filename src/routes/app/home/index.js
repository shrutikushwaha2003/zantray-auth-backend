import express from "express";

import bannerRoutes from "./banner.app.route.js";
import featureRoutes from "./features.app.route.js";
import HIWRoutes from "./howItWorks.app.route.js";
import socialLink from "./socialLink.app.route.js";
import transform from "./transform.app.route.js"


const router=express.Router();

router.use("/banner",bannerRoutes);
router.use("/feature",featureRoutes);
router.use("/HIW",HIWRoutes);
router.use("/socialLink",socialLink);
router.use("/transform",transform);

export default router;