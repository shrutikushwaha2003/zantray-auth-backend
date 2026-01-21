import express from "express";
import * as transformControllers from "../../../controllers/app/home/transform.app.controller.js";

const routes =express.Router();

//public --no auth

routes.get("/",transformControllers.getTransformSection);

export default routes;