import express from "express";
import * as teamAppController from "../../../controllers/app/about/team.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",teamAppController.getTeam);

export default router;