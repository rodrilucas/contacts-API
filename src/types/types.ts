import { SessionData } from "express-session";

export interface User {
  id: string;
}

export interface JwtPayload {
  id: string;
}

export interface UserData {
  name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
}

export interface Contact {
  first_name: string;
  last_name: string;
  info: string;
  email: string;
  twitter: string;
  phone: string;
  avatar: string;
}

export interface CustomSessionData extends SessionData {
  user?: { id: string; name: string | null };
}

export type UserWithoutPassword = Omit<UserData, "password">;
