import { Router } from "express";
import { loginUserController } from "../controllers/users.controllers";
import { loginVerify } from "../middlewares/users.middlewares";
import { dataValidation } from "../middlewares/dataValidation.middleware";
import { loginSchema } from "../schemas/users.schemas";

export const sessionRouter: Router = Router()

sessionRouter.post("", dataValidation(loginSchema), loginVerify, loginUserController)