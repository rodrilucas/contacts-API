import type { Contact } from "../types/types";
import DatabaseServiceContact from "./DatabaseServiceContact";

class ContactsService {
  private databaseServiceContact: DatabaseServiceContact;

  constructor(){
    this.databaseServiceContact = new DatabaseServiceContact();
  }

  async userExist(id: string) {
    const findUser = await this.databaseServiceContact.user(id);

    if (!findUser) return;

    return findUser;
  }

   async addContact(contactData: Contact, id: string) {
    const contact = await this.databaseServiceContact.add(contactData, id);

    if (!contact) return;
     
    return contact;
  }

  async contactsUser(id: string, q: string) {
    const userContacts = await this.databaseServiceContact.contacts(id, q);

    if (!userContacts) return;

    return userContacts;
  }


  async contactId(id: string) {
    const contact = await this.databaseServiceContact.contactById(id);

    if(!contact) return;

    return contact;
  }

  async editContact(contactData: Contact, id: string) {
    const updateContact = await this.databaseServiceContact.edit(contactData, id);

    if (!updateContact) return;

    return updateContact;
  }


  async deleteContact(id: string) {
    const contact = await this.databaseServiceContact.delete(id);

    if (!contact) return;
    
    return contact;
  }
}

export default new ContactsService();
