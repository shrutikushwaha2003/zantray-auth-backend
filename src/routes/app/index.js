import express from "express";

import aboutRoutes from "../app/about/index.js";
import homeRoutes from "../app/home/index.js";
import pricingRoutes from "../app/pricing/index.js"


const router=express.Router();

router.use("/about",aboutRoutes);
router.use("/home",homeRoutes);
router.use("/pricing",pricingRoutes)

export default router;