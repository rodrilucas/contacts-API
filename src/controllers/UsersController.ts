import type { Request, Response } from "express";
import type { CustomSessionData } from "../types/types";
import UsersService from "../services/UsersService";

class UsersController {
  async register(req: Request, res: Response) {
    const user = await UsersService.createUser(req.body);

    if (!user) {
      res.status(500).json({
        message:
          "Ocorreu um erro inesperado ao tentar criar o usuário. Tente novamente mais tarde.",
      });
    }

    (req.session as CustomSessionData).user = user;

  }

  async login(req: Request, res: Response) {
    const { user_name, password } = req.body;

    const user = await UsersService.confirmLogin(user_name, password);

    if (!user)
      return res.status(400).json({
        error: "Usuário ou senha incorretos!",
      });

    (req.session as CustomSessionData).user = user;


    res.status(200).json({ message: "Usuário autenticado com sucesso!" });
  }

  status(req: Request, res: Response) {
    if (!(req.session as CustomSessionData).user) {
      return res.status(401).json({ message: "Usuário não está autenticado!" });
    }

    return res.status(200).json({ message: "Usuário autenticado!" });
  }

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao sair da sessão.",
        });
      }

      res.status(200).json({ message: "Logout bem-sucedido." });
    });
  }
}

export default new UsersController();
