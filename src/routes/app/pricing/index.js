import express from "express";

import faqRoutes from "./faq.app.route.js";

const router =express.Router();

router.use("/faq",faqRoutes);

export default router;