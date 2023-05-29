import jwt from "jsonwebtoken";
import prisma from "../prisma/client/client.js";
import bcrypt from "bcrypt"


async function login(req, res) {
   const email = req.body.email
   const password = req.body.password

   // Check if the user exists with the given email
   const user = await prisma.user.findUnique({
      where: {
         email: email,
      },
   });

   if (!user) {
      return res.status(401).json({
         error: 'Authentication failed',
      });
   }

   // Verify the password
   const passwordMatch = await bcrypt.compare(password, user.password);

   if (!passwordMatch) {
      return res.status(401).json({
         error: 'Password do not matches',
      });
   }

   //delete token if already exit
   const token =  await prisma.auth.findUnique({
      where: {
         userId: Number(user.id),
      }
   })

   if (token) {
      await prisma.auth.delete({
         where: {
            userId:Number(user.id)
         }
      })
   }

   // Generate auth token 
   const generatedToken = jwt.sign({ email: email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '1m',
   });

   // Save token to the database

   let currentTime = new Date().getTime();
   let updatedTime = new Date(currentTime + 2 * 60 * 60 * 1000);
   await prisma.auth.create({
      data: {
         auth_token: generatedToken,
         auth_timeout: updatedTime,
         is_logged_in: true,
         is_active:true,
         user: {
            connect: {
               email: user.email,
            },
         },
      },
   });

   return res.status(201).json({ "user": email,"type":user.role, "token": generatedToken })
}


export default { login };
