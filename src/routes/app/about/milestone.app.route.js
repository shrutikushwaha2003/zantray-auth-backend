import express from "express";
import * as milestoneAppController from "../../../controllers/app/about/milestone.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",milestoneAppController.getMilestone);

export default router;