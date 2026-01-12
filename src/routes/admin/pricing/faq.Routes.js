import express from "express";
import auth from "../../../middleware/auth.middleware.js";
import * as faqController from "../../../controllers/admin/pricing/faq.Controller.js";

const router = express.Router();

router.post("/", auth("admin"), faqController.createFaq);
router.get("/", auth("admin"),faqController.getFaqs);
router.put("/:id", auth("admin"), faqController.updateFaq);
router.delete("/:id", auth("admin"), faqController.deleteFaq);

export default router;
