import jwt from "jsonwebtoken";
import prisma from "../prisma/client/client.js";
import bcrypt from "bcrypt";



async function addNewsfeed(req, res) {
    // const title = req.body.title;
    // const description = req.body.description;
    // const author = `${req.body.user.firstName} ${req.body.user.lastName}`;
   // async function addNewsfeed(req, res) {
        const { title, description, user } = req.body;
     
        if (!user || !user.firstName || !user.lastName) {
           return res.status(400).json({ error: "Invalid request body. User information is missing." });
        }
     
        const author = `${req.body.user.firstName} ${req.body.user.lastName}`;
    
     
    const role = req.body.user.role;
    const allowedRoles = ["MENTOR", "SPONSOR", "ADMIN"];
  
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "User does not have permission to add a newsfeed." });
    }
  
    try {
      let currentTime = new Date().getTime();
      let updatedTime = new Date(currentTime + 2 * 60 * 60 * 1000);
      const newsfeed = await prisma.newsfeed.create({
        data: {
          title: title,
          description: description,
          role: role,
          createdAt: currentTime,
          updatedAt: updatedTime,
          author: {
            connect: { id: req.body.user.id }
          }
        }
      });
  
      return res.status(201).json({"title": title,"description": description} );
   } catch (error) {
       return res.status(500).json({ error: "Failed to add newsfeed." });
    }
 }
  export default { addNewsfeed };