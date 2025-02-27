import { Router } from "express";
import UsersController from "../controllers/UsersController";
import Login from "../middlewares/Login";
import Register from "../middlewares/Register";

const usersRouter = Router();

usersRouter.post("/register", Register.middleware, UsersController.register);
usersRouter.post("/login", UsersController.login);
usersRouter.get("/status", Login.middleware, UsersController.status);
usersRouter.post("/logout", Login.middleware, UsersController.logout);

export default usersRouter;
