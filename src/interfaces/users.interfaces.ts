import z from "zod";
import { loginSchema, userReqSchema, userResSchema, userSchema, usersUpdateSchema } from "../schemas/users.schemas";

export type TUser = z.infer<typeof userSchema>;
export type TUserRequest = z.infer<typeof userReqSchema>
export type TUserResponse = z.infer<typeof userResSchema>
export type TUserUpdate = z.infer<typeof usersUpdateSchema>
export type TLogin = z.infer<typeof loginSchema>