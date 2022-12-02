import jwt from "jsonwebtoken";
import { AuthData } from "../types/types";
import { getConfig } from "./config";
import bcrypt from "bcryptjs";
import { expressjwt } from "express-jwt";

export const createToken = (payload: AuthData) => {
  return jwt.sign(payload, getConfig("JWT_SECRET") as string, {
    expiresIn: "1d",
  });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const authMiddleware = expressjwt({
  secret: getConfig("JWT_SECRET") as string,
  algorithms: ["HS256"],
  requestProperty: "user",
});
