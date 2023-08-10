import z from "zod";

export const contactSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  phone_number: z.string(),
  createdAt: z.string().or(z.date()),
});

export const createContactSchema = contactSchema.omit({
    id: true,
    createdAt: true
})

export const updateContactSchema = contactSchema.omit({
    id: true,
    createdAt: true
}).partial()