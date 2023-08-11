import { Router } from "express";
import { dataValidation } from "../middlewares/dataValidation.middleware";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contacts.schemas";
import {
  phoneNumberValidation,
  tokenValidation,
  validateUserEmail,
} from "../middlewares/users.middlewares";
import {
  ensureContactIsNew,
  ensureEmailExists,
  ensureEmailIsNew,
  ensurePhoneNumberExists,
} from "../middlewares/contacts.middlewares";
import {
  createContactController,
  deleteContactController,
  getContactController,
  updateContactController,
} from "../controllers/contacts.controllers";

export const contactsRouter: Router = Router();

contactsRouter.get("", tokenValidation, getContactController);

contactsRouter.post(
  "",
  dataValidation(createContactSchema),
  tokenValidation,
  phoneNumberValidation,
  ensureEmailExists,
  ensurePhoneNumberExists,
  ensureContactIsNew,
  ensureEmailIsNew,
  createContactController
);
contactsRouter.patch(
  "/:id",
  dataValidation(updateContactSchema),
  tokenValidation,
  phoneNumberValidation,
  ensureContactIsNew,
  ensureEmailExists,
  ensureEmailIsNew,
  updateContactController
);

contactsRouter.delete(
  "/:id",
  tokenValidation,
  ensurePhoneNumberExists,
  deleteContactController
);
