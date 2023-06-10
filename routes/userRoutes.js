import { canDeleteUserProfile, canViewUserProfile, canUpdateUserProfile } from "../permissions/user.js";
import { Router } from "express";
import { authRole, authenticateToken } from "../middlewares/auth.js";
import { deleteUser,updateUser,getUser } from "../controllers/userControllers.js";
import ROLES from "../permissions/role.js";

const router = Router();

router.get("/:id", authenticateToken, authRole([ROLES.MENTOR,ROLES.AWARDEE,ROLES.ADMIN]), authGetUserProfile,getUser)
router.delete("/delete/:id",authenticateToken,authRole([ROLES.ADMIN]),authDeleteUserProfile,deleteUser)
router.put("/update/:id",authenticateToken,authRole([ROLES.AWARDEE,ROLES.ADMIN]),authUpdateUserProfile,updateUser)


function authGetUserProfile(req, res, next) {
    if (!canViewUserProfile(req.user, req.params.id)) {
        res.status(403)
        return res.send('Not Allowed ')
    }

    next()
}


function authDeleteUserProfile(req, res, next) {
    if (!canDeleteUserProfile(req.user)) {
        res.status(403)
        return res.send('Not Allowed')
    }

    next()
}
function authUpdateUserProfile(req, res, next) {
    if (!canUpdateUserProfile(req.user, req.params.id)) {
        res.status(403)
        return res.send('Not Allowed')
    }
    next()
}


export default router