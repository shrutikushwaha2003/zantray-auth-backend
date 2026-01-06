import express from "express";
import * as bannerController from "../../../controllers/admin/home/homePage.controller.js";
import auth from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth("admin"), bannerController.createBanner);
router.get("/", auth("admin"), bannerController.getBanners);
router.get("/:id", auth("admin"), bannerController.getBanner);
router.put("/:id", auth("admin"), bannerController.updateBanner);
router.delete("/:id", auth("admin"), bannerController.deleteBanner);

export default router;



