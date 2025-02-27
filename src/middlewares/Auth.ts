import type { Request, Response, NextFunction } from "express";
import UsersService from "../services/UsersService";
import { CustomSessionData } from "../types/types";

class Auth {
  async middleware(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req.session as CustomSessionData).user) {
        return res.status(401).json({ message: "Acesso não autorizado!" });
      }

      const session = (req.session as CustomSessionData).user;
      const user = await UsersService.findUserById(session?.id!);

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado!" });
      }

      (req.session as CustomSessionData).user = user;

      next();
    } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}

export default new Auth();
