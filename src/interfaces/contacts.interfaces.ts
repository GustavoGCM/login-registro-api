import z from "zod";
import { contactSchema, createContactSchema } from "../schemas/contacts.schemas";

export type TContact = z.infer<typeof contactSchema>;
export type TContactRequest = z.infer<typeof createContactSchema>