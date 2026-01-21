import express from "express";
import * as socialLinkAppController from "../../../controllers/app/home/socialLink.app.controller.js";

const routes =express.Router();

//public --no auth

routes.get("/",socialLinkAppController.getSocialLink);

export default routes;