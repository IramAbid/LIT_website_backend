import jwt from "jsonwebtoken";
import prisma from "../prisma/client/client.js";
import bcrypt from "bcrypt";
import { authRole } from "../middlewares/auth.js";
import ROLES from "../permissions/role.js";


async function addNewsfeed(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const id = req.body.id;
  
    try {
      const addNewsfeed = await prisma.newsfeed.create({
        data: {
          title: title,
          description: description,   
          author: {
            connect: { id: id }
          }
        }
      });
  
      return res.status(201).json(addNewsfeed);
   } catch (error) {
       return res.status(500).json({ error: "Failed to add newsfeed." });
    }
 }
  
  async function updateNewsfeed(req,res)
  {
   const id = req.body.id;
   const title = req.body.title;
   const description=req.body.description;
   try{
    const updatedNewsfeed = await prisma.newsfeed.update({
      where:{
        id:id
      },
      data:{
        title: title,
        description: description,
      }
    });
    return res.status(200).json(updatedNewsfeed);
   }
   catch{
    return res.status(500).json({error: "Failed to update newsfeed"})
   }
  }

  async function deleteNewsfeed(req,res)
  {
   const id = req.body.id;
   try{
    const deleteNewsfeed = await prisma.newsfeed.delete({
      where:{
        id:id
      },
    });
    return res.status(200).json(deleteNewsfeed);
   }
   catch{
    return res.status(500).json({error: "Failed to delete newsfeed"})
   }
  }


async function getNews(req, res) {
  const { take, skip } = req.body;

  try {
    const newsfeeds = await prisma.newsfeed.findMany({
      take: take ? parseInt(take) : 10, // Number of newsfeeds to retrieve
      skip: skip ? parseInt(skip) : 0, // Number of newsfeeds to skip
      orderBy: { createdAt: "desc" }, // Order by newest newsfeed first
    });

    res.status(200).json(newsfeeds);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve newsfeeds." });
  }
}

  export default { addNewsfeed , updateNewsfeed, deleteNewsfeed,  getNews };

   