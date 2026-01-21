import express from "express";
import * as featureAppController from "../../../controllers/app/home/feature.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",featureAppController.getFeatures);

export default router;