import { sign } from "jsonwebtoken";
import { TLogin } from "../interfaces/users.interfaces";

export const loginUserService = (data: TLogin, id: number): string => {
  const user: TLogin = data;

  const token: string = sign(
    { email: user.email },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(id),
    }
  );

  return token;
};