import { Router } from "express";
import newsfeedControllers from "../controllers/newsfeedControllers.js"
import { authenticateToken, authRole } from "../middlewares/auth.js";
import ROLES from "../permissions/role.js";
import { canDeleteNewsfeed, canViewNewsfeed, canUpdateNewsfeed } from "../permissions/newsfeed.js";


const router = Router();

router.post("/newsfeed/add",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]), newsfeedControllers.addNewsfeed);

router.put("/newsfeed/update/:id",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]),authUpdateNewsfeed, newsfeedControllers.updateNewsfeed);

router.delete("/newsfeed/delete/:id",authenticateToken, authRole([ROLES.ADMIN, ROLES.MENTOR, ROLES.SPONSOR]),authDeleteNewsfeed, newsfeedControllers.deleteNewsfeed);

router.get('/newsfeed/readNews', authGetNewsfeed, newsfeedControllers.getNews);

function authGetNewsfeed(req, res, next) {
    if (!canViewNewsfeed(req.user, req.params.id)) {
        res.status(403)
        return res.send('Not Allowed ')
    }

    next()
}


function authDeleteNewsfeed(req, res, next) {
    if (!canDeleteNewsfeed(req.user)) {
        res.status(403)
        return res.send('Not Allowed')
    }

    next()
}
function authUpdateNewsfeed(req, res, next) {
    if (!canUpdateNewsfeed(req.user, req.params.id)) {
        res.status(403)
        return res.send('Not Allowed')
    }
    next()
}


export default router