import express from "express";
import * as storyController from "../../../controllers/admin/about/story.Controller.js";
import auth from "../../../middleware/auth.middleware.js";
import upload from "../../../middleware/upload.middleware.js";


const router = express.Router();

router.post("/", auth("admin"), upload.single("image"), storyController.createStory);
router.get("/", auth("admin"),storyController.getStories);
router.get("/:id",auth("admin"), storyController.getStory);
router.put("/:id", auth("admin"), upload.single("image"), storyController.updateStory);
router.delete("/:id", auth("admin"), storyController.deleteStory);

export default router;
