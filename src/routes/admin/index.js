import { Router } from "express";
const adminRoutes = Router();

// AUTH
import adminAuthRoutes from "../../routes/admin/auth/auth.route.js";

// HOME MODULE
import bannerRoutes from "../../routes/admin/home/banner.Route.js";
import howItWorksRoutes from "../../routes/admin/home/howItWorks.Route.js";
import featuresRoutes from "../../routes/admin/home/features.Route.js";



adminRoutes.use("/auth", adminAuthRoutes);

// HOME
adminRoutes.use("/home/banners", bannerRoutes);
adminRoutes.use("/home/how-it-works", howItWorksRoutes);
adminRoutes.use("/home/features", featuresRoutes);


export default adminRoutes;
