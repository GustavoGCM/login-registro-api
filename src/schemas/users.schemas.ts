import z from "zod";

export const userSchema = z.object({
  id:z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(45),
  phone_number: z.string(),
  admin: z.boolean().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()),
});

export const userReqSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
  phone_number: true,
  admin: true,
});

export const loginSchema = userReqSchema.omit({admin: true, name: true, phone_number: true})

export const userResSchema = userSchema.partial({password: true})

export const usersUpdateSchema = userSchema.omit({id: true}).partial()