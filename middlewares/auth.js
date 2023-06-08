import jwt from "jsonwebtoken";
import prisma from "../prisma/client/client.js";

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(403).send("You need to sign in")
  
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err,user) => {
      if (err) return res.status(403).send("You need to sign in")
      req.user= user;
      next()
    })
  }

const authRole=  (role) =>{
  return async (req,res,next)=>{
    const usr= await prisma.user.findUnique({
      where:{
        email: req.user.email
      }
    });
    if(!role.includes(usr.role)){
      return res.status(401).send("Not Allowed");
    }
    req.user= usr
    next();
  }
}

export {authenticateToken, authRole};
