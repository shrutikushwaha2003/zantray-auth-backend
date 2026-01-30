import express from "express";
import {
  getCustomizer,
  updateBranding,
  updateColors,
  updateLayout,
} from "../../controllers/instructor/customizer/customizer.controller.js";

import auth from "../../middleware/auth.middleware.js";
import role from "../../middleware/role.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

router.get(
  "/",
  auth("user"),
  role("instructor"),
  getCustomizer
);

router.put(
  "/branding",
  auth("user"),
  role("instructor"),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateBranding
);

router.put(
  "/colors",
  auth("user"),
  role("instructor"),
  updateColors
);

router.put(
  "/layout",
  auth("user"),
  role("instructor"),
  updateLayout
);

export default router;
