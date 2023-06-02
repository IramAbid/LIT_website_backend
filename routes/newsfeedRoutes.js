import { Router } from "express";
import newsfeedControllers from "../controllers/newsfeedControllers.js"


const router = Router();

router.post("/newsfeed", newsfeedControllers.addNewsfeed);


export default router;