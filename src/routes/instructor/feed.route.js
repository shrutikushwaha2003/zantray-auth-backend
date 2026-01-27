import express from "express";
import {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
} from "../../controllers/instructor/feed/feed.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/", auth("user"),role("instructor"), createFeed);
router.get("/", auth("user"),role("instructor"), getFeeds);
router.put("/:id", auth("user"),role("instructor"), updateFeed);
router.delete("/:id", auth("user"),role("instructor"), deleteFeed);

export default router;
