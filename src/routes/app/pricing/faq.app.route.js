import express from "express";
import * as faqAppController from "../../../controllers/app/pricing/faq.app.controller.js";

const routes =express.Router();

//public --no auth

routes.get("/",faqAppController.getFaq);

export default routes;