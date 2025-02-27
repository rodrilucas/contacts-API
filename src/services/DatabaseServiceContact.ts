import type { Contact } from "../types/types";
import { db } from "../../db";
import AppError from "../../util/errors";

class DatabaseServiceContact {
  async user(id: string) {
    try {
      const user = await db.user.findFirst({
        where: { id },
        select: {
          user_name: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      throw new AppError(
        "Error ao encontrar o usuário no banco de dados!",
        500
      );
    }
  }

  async add(contactData: Contact, id: string) {
    try {
      const contact = await db.contacts.create({
        data: {
          ...contactData,
          user: {
            connect: { id },
          },
        },
      });

      return contact;
    } catch (error) {
      throw new AppError(
        "Não possível adicionar o contato no banco de dados!",
        500
      );
    }
  }

  async contacts(id: string, q: string) {
    try {
      const userContacts = await db.user.findUnique({
        where: { id },
        select: {
          contacts: {
            where: q
              ? {
                  OR: [
                    {
                      first_name: {
                        contains: q as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      last_name: { contains: q as string, mode: "insensitive" },
                    },
                  ],
                }
              : undefined,
            orderBy: { first_name: "asc" },
          },
        },
      });

      return userContacts?.contacts;
    } catch (error) {
      throw new AppError(
        "Não foi possível buscar os contados do usuário no banco de dados",
        500
      );
    }
  }

  async contactById(id: string) {
    try {
      const contact = await db.contacts.findFirst({
        where: { id },
      });

      return contact;
    } catch (error) {
      throw new AppError(
        "Não foi possível buscar o contato dentro do banco de dados",
        500
      );
    }
  }

  async edit(contactData: Contact, id: string) {
    try {
      const updateContact = await db.contacts.update({
        where: { id },
        data: {
          ...contactData,
        },
      });

      return updateContact;
    } catch (error) {
      throw new AppError(
        `Não foi possível editar o contato com o ${id} no banco de dados!`,
        500
      );
    }
  }

  async delete(id: string) {
    try {
      const contact = await db.contacts.delete({
        where: { id },
      });

      return contact;
    } catch (error) {
      throw new AppError(
        "Não foi possível deletar o contato no banco de dados!",
        500
      );
    }
  }
}

export default DatabaseServiceContact;
