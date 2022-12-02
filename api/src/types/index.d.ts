import { AuthData } from "./types";

declare global {
  namespace Express {
    interface Request {
      user: AuthData;
    }
  }
}
