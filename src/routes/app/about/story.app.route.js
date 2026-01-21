import express from "express";
import * as storyAppController from "../../../controllers/app/about/story.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",storyAppController.getStory);

export default router;