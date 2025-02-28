import type { Request, Response, NextFunction } from "express";
import { CustomSessionData } from "../types/types";

class Auth {
  async middleware(req: Request, res: Response, next: NextFunction) {
    const session = (req.session as CustomSessionData).user;

    if (!session) {
      return res.status(401).json({ message: "Acesso não autorizado!" });
    }
    
    next();
  }
}

export default new Auth();
