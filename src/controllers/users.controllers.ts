import { Request, Response } from "express";
import { TUserResponse } from "../interfaces/users.interfaces";
import { createUserService, deleteUserService, readUsersService, updateUserService } from "../services/users.services";
import { loginUserService } from "../services/session.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const newUser: TUserResponse = await createUserService(req.body)

    return res.status(201).json(newUser)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {

    await deleteUserService(+req.params.id)
    
    return res.status(204).send()
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {

    const update: TUserResponse = await updateUserService(+req.params.id, req.body)

    return res.status(200).json(update)
}

export const readUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users: TUserResponse[] = await readUsersService() 

    return res.status(200).json(users)
}
export const loginUserController = async (req: Request, res: Response): Promise<Response> => {

    const token: string = loginUserService(req.body, res.locals.userId)

    return res.status(200).json({token: token})
}