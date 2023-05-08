import  jwt  from "jsonwebtoken";
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

   // Generate auth token 
   const token = jwt.sign({ email: email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '1h',
   });

   // Save token to the database
   await prisma.auth.create({
      data: {
         auth_token: token,
         user: {
            connect: {
               email: email,
            },
         },
      },
   });


   return res.status(201).json({ "user": email, "token": token })
}


export default { login };
