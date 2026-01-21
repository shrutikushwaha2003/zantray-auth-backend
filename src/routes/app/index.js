import express from "express";

import aboutRoutes from "../app/about/index.js";
import homeRoutes from "../app/home/index.js";


const router=express.Router();

router.use("/about",aboutRoutes);
router.use("/home",homeRoutes);

export default router;