import { Request, Response } from "express";
import { createContactService, deleteContactService, getContactsService, updateContactService} from "../services/contacts.service";
import Contact from "../entities/contacts.entity";

export const getContactController = async (req: Request, res: Response): Promise<Response> => {

    const allContacts = await getContactsService(+res.locals.userPermission.sub)

    return res.status(200).json(allContacts)
}
export const createContactController = async (req: Request, res: Response): Promise<Response> => {

    const newContact: Contact = await createContactService(req.body, res.locals.userPermission.sub)

    return res.status(201).json(newContact)
}

export const updateContactController = async (req: Request, res: Response): Promise<Response> => {

    const newContact: Contact = await updateContactService(+req.params.id, req.body)

    return res.status(200).json(newContact)
}

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {

    await deleteContactService(+req.params.id)
    
    return res.status(204).send()
}
