import { UserData } from "../types/types";
import PasswordService from "./PasswordService";
import DatabaseService from "./DatabaseServiceUser";

class AuthService {
  private passwordService: PasswordService;
  private databaseService: DatabaseService;

  constructor() {
    this.passwordService = new PasswordService();
    this.databaseService = new DatabaseService();
  }

  async findUserById(id: string) {
    const findUser = await this.databaseService.userId(id);

    if (!findUser) return;

    return findUser;
  }

  async createUser(data: UserData) {
    const { password, ...rest } = data;
    const { hashed_pass, salt } = await this.passwordService.hashPassword(
      password
    );

    const user = await this.databaseService.create(rest, hashed_pass, salt);

    if (!user) return;

    return { id: user.id, name: user.name };
  }

  async confirmLogin(user_name: string, password: string) {
    const user = await this.databaseService.findUserByUsername(user_name);

    if (!user) return;

    const isValidPassword = await this.passwordService.validatePassword(
      password,
      user.hashed_pass!,
      user.salt!
    );

    if (!isValidPassword) return;

    return { id: user.id, name: user.name };
  }

  async userExist(user_name: string, email: string) {
    const user = this.databaseService.findExistingUser(user_name, email);

    if (!user) return;

    return user;
  }
}

export default new AuthService();
