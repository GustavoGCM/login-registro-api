import { Router } from "express";
import { dataValidation } from "../middlewares/dataValidation.middleware";
import { userReqSchema, usersUpdateSchema } from "../schemas/users.schemas";
import {
  ensureIdExists,
  permissionValidation,
  phoneNumberValidation,
  tokenValidation,
  validateUserEmail,
} from "../middlewares/users.middlewares";
import {
  createUserController,
  deleteUserController,
  readUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureContactIsNew } from "../middlewares/contacts.middlewares";

export const usersRouter: Router = Router();

usersRouter.post(
  "",
  dataValidation(userReqSchema),
  validateUserEmail,
  phoneNumberValidation,
  ensureContactIsNew,
  createUserController
);
usersRouter.delete(
  "/:id",
  tokenValidation,
  ensureIdExists,
  permissionValidation,
  deleteUserController
);
usersRouter.patch(
  "/:id",
  dataValidation(usersUpdateSchema),
  tokenValidation,
  ensureIdExists,
  permissionValidation,
  validateUserEmail,
  updateUserController
);
usersRouter.get("", tokenValidation, permissionValidation, readUsersController);
