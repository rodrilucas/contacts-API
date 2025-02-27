import { UserWithoutPassword } from "../types/types";
import AppError from "../../util/errors";
import { db } from "../../db";

class DatabaseService {
  async userId(id: string) {
    try {
      const findUser = await db.user.findUnique({
        where: { id },
        select: { id: true, name: true },
      });

      return findUser;
    } catch (error) {
      throw new AppError(
        "Não foi possível buscar o usuário no banco de dados!",
        500
      );
    }
  }

  async create(data: UserWithoutPassword, hashed_pass: string, salt: string) {
    try {
      const createUser = await db.user.create({
        data: {
          ...data,
          hashed_pass,
          salt,
        },
      });

      return createUser;
    } catch (error) {
      throw new AppError("Erro ao criar usuário no banco de dados.", 500);
    }
  }

  async findUserByUsername(user_name: string) {
    try {
      const findUser = await db.user.findUnique({
        where: { user_name },
        select: { id: true, hashed_pass: true, name: true, salt: true },
      });

      return findUser;
    } catch (error) {
      throw new AppError("Erro ao buscar usuário no banco de dados.", 500);
    }
  }

  async findExistingUser(user_name: string, email: string) {
    try {
      const user = await db.user.findFirst({
        where: {
          OR: [{ user_name }, { email }],
        },
        select: {
          user_name: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      throw new AppError(
        "Não foi possível validar se já existe um usuário cadastrado com essas informações.",
        500
      );
    }
  }
}

export default DatabaseService;
