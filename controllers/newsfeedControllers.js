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
          lastEditedBy : Number(id),
          author: {
            connect: { id: Number(id) }
          }
        }
      });
  
      return res.status(201).json(addNewsfeed);
   } catch (error) {
       return res.status(500).json({ error: "Failed to add newsfeed." });
    }
 }

 async function updateNewsfeed(req, res) {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const loggedUserId = req.user.id; // Assuming the logged-in user ID is accessible from req.user

  try {
    const updatedNewsfeed = await prisma.newsfeed.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        description: description,
      lastEditedBy: loggedUserId, // Update the lastEditedBy column with the logged-in user ID
      },
    });

    return res.status(200).json(updatedNewsfeed);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update newsfeed" });
  }
}

async function deleteNewsfeed(req, res) {
  const id = req.params.id;
 const loggedUserId = req.user.id; // Assuming the logged-in user ID is accessible from req.user

  try {
    const deletedNewsfeed = await prisma.newsfeed.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json(deletedNewsfeed);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete newsfeed" });
  }
}

async function getNews(req, res) {
  const { take, skip } = req.query;

  try {
    const newsfeeds = await prisma.newsfeed.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      take: 15,
      orderBy: {
        createdAt: "desc",
      },
    });
   

    res.status(200).json(newsfeeds);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve newsfeeds." });
  }
}

  export default { addNewsfeed , updateNewsfeed, deleteNewsfeed,  getNews };

   