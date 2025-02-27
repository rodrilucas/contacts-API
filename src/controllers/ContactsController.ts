import type { Contact, CustomSessionData } from "../types/types";
import type { Request, Response } from "express";
import ContactsService from "../services/ContactsService";

class ContactsController {
  async showContacts(req: Request<{}, {}, {}, { q: string }>, res: Response) {
    const user = (req.session as CustomSessionData).user;

    if (!user || !user.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const { q } = req.query;

    const contacts = await ContactsService.contactsUser(user.id, q);

    if (!contacts) {
      return res
        .status(204)
        .json({ message: "Não existem contatos para exibir!" });
    }

    res.status(200).json(contacts);
  }

  async showContactId(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Você precisa fornecer o id do contato!" });
    }

    const contact = await ContactsService.contactId(id);

    if (!contact) {
      return res.status(400).json({ message: "Contato não encontrado!" });
    }

    return res.status(200).json(contact);
  }

  async create(req: Request, res: Response) {
    const data = req.body;

    if (!Object.keys(data).length) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não fornecidos!" });
    }

    const user = (req.session as CustomSessionData).user;

    if (!user || !user.id) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    await ContactsService.userExist(user.id);

    const contact = await ContactsService.addContact(data, user.id);

    res.status(200).json(contact);
  }

  async edit(req: Request<{ id: string }, {}, Contact>, res: Response) {
    const data = req.body;

    if (!data) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios não fornecidos!" });
    }

    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Você precisa fornecer o id do contato!" });
    }

    await ContactsService.userExist(id);

    const contact = await ContactsService.editContact(data, id);

    return res.status(200).json(contact);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Você precisa fornecer o id do contato!" });
    }

    const contact = await ContactsService.deleteContact(id);

    return res.status(200).json(contact);
  }
}

export default new ContactsController();
