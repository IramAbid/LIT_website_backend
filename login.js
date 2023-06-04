import { PrismaClient } from '@prisma/client';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();


console.log(prisma);

async function login(req, res) {
  const { email, password } = req.body;

  // Check if the user exists with the given email
  const user = await prisma.userauth.findUnique({
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
      error: 'Authentication failed',
    });
  }

  // Generate auth token and timestamp
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const timestamp = new Date();

  // Save token and timestamp to the database
  await prisma.auth.create({
    data: {
      token: token,
      timestamp: timestamp,
      user: {
        connect: {
          email: email,
        },
      },
    },
  });

  // Return auth token and timestamp to the user
  return res.status(200).json({
    token: token,
    timestamp: timestamp,
  });
}

export default login;

