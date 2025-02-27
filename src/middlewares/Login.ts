import type { Request, Response, NextFunction } from "express";
import { CustomSessionData } from "../types/types";

class Login {
  middleware(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req.session as CustomSessionData).user) {
        return res.status(401).json({ message: "Acesso não autorizado!" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}

export default new Login();
