import express from "express";
import * as storyController from "../../../controllers/admin/about/story.Controller.js";
import auth from "../../../middleware/auth.middleware.js";
import upload from "../../../middleware/upload.middleware.js";

const router = express.Router();

// CREATE STORY (only once)
router.post(
  "/",
  auth("admin"),
  upload.fields([
    { name: "topLeft", maxCount: 1 },
    { name: "topRight", maxCount: 1 },
    { name: "bottom", maxCount: 1 },
  ]),
  storyController.createStory
);

// GET STORY
router.get("/", auth("admin"), storyController.getStory);

// UPDATE STORY
router.put(
  "/",
  auth("admin"),
  upload.fields([
    { name: "topLeft", maxCount: 1 },
    { name: "topRight", maxCount: 1 },
    { name: "bottom", maxCount: 1 },
  ]),
  storyController.updateStory
);

// SOFT DELETE STORY
router.delete("/", auth("admin"), storyController.deleteStory);

export default router;
