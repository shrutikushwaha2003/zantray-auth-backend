import { Router } from "express";
import faqRoutes from "../pricing/faq.Routes.js";

const router = Router();

router.use("/faq", faqRoutes);

export default router;
