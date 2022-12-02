import { RequestHandler } from "express";
import { z } from "zod";
import { db } from "../common/db";
import { comparePassword, createToken } from "../common/auth";

const LoginDataSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const errorMessage = "Password or username is invalid";

export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const loginData = LoginDataSchema.parse(req.body);

    const foundUser = await db.user.findUnique({
      where: {
        username: loginData.username,
      },
    });

    // If no user found, return error
    if (!foundUser) {
      return res.status(401).json({
        message: errorMessage,
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(
      loginData.password,
      foundUser.passwordHash
    );

    // If password is not valid, return error
    if (!isPasswordValid) {
      return res.status(401).json({
        message: errorMessage,
      });
    }

    // Create token
    const token = createToken({
      id: foundUser.id,
      username: foundUser.username,
      name: foundUser.name,
    });

    // Return token
    return res.json({
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
