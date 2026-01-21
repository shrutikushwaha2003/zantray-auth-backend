import { Router } from "express";
import adminRoutes from "./admin/index.js";
import appRoutes from "./app/index.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/app",appRoutes);

export default router;
