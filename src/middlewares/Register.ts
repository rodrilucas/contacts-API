import type { Request, Response, NextFunction } from "express";
import type { UserData } from "../types/types";
import { createUserSchema } from "../validators/user";
import UsersService from "../services/UsersService";

class Register {
  async middleware(
    req: Request<{}, {}, UserData>,
    res: Response,
    next: NextFunction
  ) {
    const data = req.body;

    if (!Object.keys(data).length) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não fornecidos!" });
    }

    const result = createUserSchema.safeParse(data);

    const user = await UsersService.userExist(data.user_name, data.email);

    const errors: Record<string, string[]> = {};

    if (user?.user_name === data.user_name) {
      errors.user_name = ["Já existe um usuário cadastrado com esse nome."];
    }

    if (user?.email === data.email) {
      errors.email = ["Já existe um usuário cadastrado com esse email."];
    }

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten().fieldErrors,
        ...errors,
      });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  }
}

export default new Register();
