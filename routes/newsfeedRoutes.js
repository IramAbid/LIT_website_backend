import { Router } from "express";
import newsfeedControllers from "../controllers/newsfeedControllers.js"
import { authenticateToken, authRole } from "../middlewares/auth.js";
import ROLES from "../permissions/role.js";
import { canDeleteNewsfeed, canUpdateNewsfeed } from "../permissions/newsfeed.js";
import prisma from "../prisma/client/client.js";


const router = Router();

router.post("/newsfeed/add",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]), newsfeedControllers.addNewsfeed);

router.put("/newsfeed/update/:id",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]),authUpdateNewsfeed, newsfeedControllers.updateNewsfeed);

router.delete("/newsfeed/delete/:id",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]),authDeleteNewsfeed, newsfeedControllers.deleteNewsfeed);

router.get('/newsfeed/readNews',authenticateToken, newsfeedControllers.getNews);


function authDeleteNewsfeed(req, res, next) {
    const { id: newsfeedId } = req.params;
  
    prisma.newsfeed
      .findUnique({
        where: { id: Number(newsfeedId) },
        select: { userId: true },
      })
      .then((newsfeed) => {
        if (!canDeleteNewsfeed(req.user, newsfeed.userId)) {
          res.status(403);
          return res.send("Not Allowed");
        }
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve newsfeed." });
      });
  }
  
  function authUpdateNewsfeed(req, res, next) {
    const { id: newsfeedId } = req.params;
  
    prisma.newsfeed
      .findUnique({
        where: { id: Number(newsfeedId) },
        select: { userId: true },
      })
      .then((newsfeed) => {
        if (!canUpdateNewsfeed(req.user, newsfeed.userId)) {
          res.status(403);
          return res.send("Not Allowed");
        }
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve newsfeed." });
      });
  }
  
export default router