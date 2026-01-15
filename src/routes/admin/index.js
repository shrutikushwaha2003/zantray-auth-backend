import { Router } from "express";
const adminRoutes = Router();

import homeRoutes from "./home/index.js";
import aboutRoutes from "./about/index.js";
import authRoutes from "./auth/index.js";
import pricingRoutes from "./pricing/index.js";



adminRoutes.use("/home", homeRoutes);
adminRoutes.use("/about",aboutRoutes);
adminRoutes.use("/auth",authRoutes);
adminRoutes.use("/pricing",pricingRoutes);


export default adminRoutes;

