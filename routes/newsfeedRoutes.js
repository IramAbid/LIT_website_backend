import { Router } from "express";
import newsfeedControllers from "../controllers/newsfeedControllers.js"
import { authenticateToken, authRole } from "../middlewares/auth.js";
import ROLES from "../permissions/role.js";


const router = Router();

router.post("/newsfeed/add",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]), newsfeedControllers.addNewsfeed);

router.post("/newsfeed/update",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]), newsfeedControllers.updateNewsfeed);

router.post("/newsfeed/delete",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]), newsfeedControllers.deleteNewsfeed);

//router.post("/newsfeed/getnews/newsfeed ", newsfeedControllers.getNews);
router.post('/newsfeed/getNews/newsfeed',newsfeedControllers.getNews);

export default router;