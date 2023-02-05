import { Router } from "express";
import { getConfig } from "../common/config";

const healthchecksRouter = Router();

healthchecksRouter.get("/", (req, res) => {
  return res.json({
    message: "success",
    mode: getConfig("MODE"),
    env: getConfig("NODE_ENV"),
    version: '1.0.2'
  });
});

export default healthchecksRouter;
