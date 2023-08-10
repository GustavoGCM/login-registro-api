import { Router } from "express";
import { loginUserController } from "../controllers/users.controllers";
import { loginVerify } from "../middlewares/users.middlewares";

export const sessionRouter: Router = Router()

sessionRouter.post("", loginVerify, loginUserController)