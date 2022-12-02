import { RequestHandler } from "express";
import { z } from "zod";
import { createToken, hashPassword } from "../common/auth";
import { db } from "../common/db";

const AuthDataSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
});

export const registerHandler: RequestHandler = async (req, res, next) => {
  try {
    const registerData = AuthDataSchema.parse(req.body);

    // Check if user already exists
    const foundUser = await db.user.findUnique({
      where: {
        username: registerData.username,
      },
    });

    // If user exists, return error
    if (foundUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const passwordHash = await hashPassword(registerData.password);

    // Create user
    const user = await db.user.create({
      data: {
        username: registerData.username,
        passwordHash,
        name: registerData.name,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    // Return user and token
    return res.json({
      user,
      token: createToken(user),
    });
  } catch (error) {
    next(error);
  }
};
