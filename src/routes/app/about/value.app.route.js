import express from "express";
import * as valueAppController from "../../../controllers/app/about/values.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",valueAppController.getValue);

export default router;