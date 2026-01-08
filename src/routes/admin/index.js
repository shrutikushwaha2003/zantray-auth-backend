import { Router } from "express";
const adminRoutes = Router();

// ===== AUTH ===== //
import adminAuthRoutes from "../../routes/admin/auth/auth.route.js";

// ===== HOME MODULES ===== //
import bannerRoutes from "../../routes/admin/home/banner.Route.js";
import howItWorksRoutes from "../../routes/admin/home/howItWorks.Route.js";
import featuresRoutes from "../../routes/admin/home/features.Route.js";
import heroRoutes from "../../routes/admin/home/hero.Route.js";   

// ===== AUTH ROUTES ===== //
adminRoutes.use("/auth", adminAuthRoutes);

// ===== HOME ROUTES ===== //
adminRoutes.use("/home/banner", bannerRoutes);
adminRoutes.use("/home/how-it-works", howItWorksRoutes);
adminRoutes.use("/home/features", featuresRoutes);
adminRoutes.use("/home/hero", heroRoutes);   

export default adminRoutes;
