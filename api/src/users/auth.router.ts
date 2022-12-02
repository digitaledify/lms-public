import { Router } from "express";
import { loginHandler } from "./login.handler";
import { registerHandler } from "./register.handler";

export const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/register", registerHandler);

