import express from "express";
import * as heroAppController from "../../../controllers/app/about/hero.app.controller.js";

const router =express.Router();

//public --no auth

router.get("/",heroAppController.getHero);

export default router;