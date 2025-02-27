import { Router } from "express";
import ContactsController from "../controllers/ContactsController";
import Auth from "../middlewares/Auth";
import Contact from "../middlewares/Contact";

const contactsRoutes = Router();

contactsRoutes.get("/", Auth.middleware, ContactsController.showContacts);
contactsRoutes.get("/:id", Auth.middleware, ContactsController.showContactId);

contactsRoutes.patch(
  "/edit/:id",
  Auth.middleware,
  Contact.middleware,
  ContactsController.edit
);
contactsRoutes.post(
  "/add",
  Auth.middleware,
  Contact.middleware,
  ContactsController.create
);
contactsRoutes.delete("/:id", Auth.middleware, ContactsController.delete);

export default contactsRoutes;
