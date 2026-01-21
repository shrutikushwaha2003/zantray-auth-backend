import express from "express";
import * as HIWAppController from "../../../controllers/app/home/howItWorks.app.controller.js";

const routes =express.Router();

//public --no auth

routes.get("/",HIWAppController.getContent);

export default routes;