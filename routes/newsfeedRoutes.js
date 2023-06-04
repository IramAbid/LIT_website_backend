import { Router } from "express";
import newsfeedControllers from "../controllers/newsfeedControllers.js"


const router = Router();

router.post("/newsfeed/add", newsfeedControllers.addNewsfeed);

router.post("/newsfeed/update", newsfeedControllers.updateNewsfeed);

router.post("/newsfeed/delete", newsfeedControllers.deleteNewsfeed);
export default router;