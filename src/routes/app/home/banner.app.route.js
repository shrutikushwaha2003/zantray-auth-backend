import express from "express";
import * as bannerAppController from "../../../controllers/app/home/banner.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",bannerAppController.getbanner);

export default router;