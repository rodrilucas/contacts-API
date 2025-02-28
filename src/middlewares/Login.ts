import type { Request, Response, NextFunction } from "express";
import { CustomSessionData } from "../types/types";

class Login {
  middleware(req: Request, res: Response, next: NextFunction) {
    const session = (req.session as CustomSessionData).user;

    if (session) {
      return res.status(200).json({ message: "O usuário já está autenticado!" });
    }

    next();
  }
}

export default new Login();
