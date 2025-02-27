import { Router } from "express";
import usersRouter from "./users.routers";
import contactsRoutes from "./contacts.routers";

const routes = Router();

routes.use("/", usersRouter);
routes.use("/contacts", contactsRoutes);

export default routes;
