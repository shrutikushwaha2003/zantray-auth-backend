import express from "express";

import courses from "./courses.route.js";


const router =express.Router();

router.use("/courses",courses);


export default router;