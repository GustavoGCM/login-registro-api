import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import User from "../entities/users.entity";
import Contact from "../entities/contacts.entity";

export const ensureEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;

  if (email) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const emailValidate: User | null = await userRepository
      .createQueryBuilder("user")
      .select("user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (!emailValidate) {
      throw new AppError("Email not found", 404);
    }
  }

  return next();
};

export const ensurePhoneNumberExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number: string = req.body.phone_number;
  const id: string | null = req.params.id;

  if (number) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const phoneValidate: User | null = await userRepository
      .createQueryBuilder("user")
      .select("user")
      .where("user.phone_number = :number", { number: number })
      .getOne();

    if (!phoneValidate) {
      throw new AppError("Phone number not found", 404);
    }
  }

  if (id) {
    const contactRepository: Repository<Contact> =
      AppDataSource.getRepository(Contact);
    const phoneValidate: Contact | null = await contactRepository
      .createQueryBuilder("contact")
      .select("contact")
      .where("contact.id = :id", { id: id })
      .getOne();

    if (!phoneValidate) {
      throw new AppError("Phone number not found", 404);
    }
  }
  return next();
};

export const ensureEmailIsNew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const contactParamId = req.params.id;
  const userId: string | null = res.locals.userPermission?.sub;

  if (!userId) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userValidate: User | null = await userRepository
      .createQueryBuilder("contact")
      .select("contact")
      .where("contact.number = :email", { email: email })
      .getOne();

    if (userValidate) {
      throw new AppError("Contact already exists", 409);
    }

    return next();
  }
  if (email) {
    const contactRepository: Repository<Contact> =
      AppDataSource.getRepository(Contact);
    const contactValidate: Contact | null = await contactRepository
      .createQueryBuilder("contact")
      .select("contact")
      .where("contact.email = :email", { email: email })
      .getOne();

    const userContactRepository: Repository<User> =
      AppDataSource.getRepository(User);

    if (contactValidate) {
      const validation: User | null = await userContactRepository
        .createQueryBuilder("user")
        .select("user")
        .where("user.id = :id", {
          id: userId,
        })
        .getOne();

      const validationRelation: User[] | null | undefined =
        await AppDataSource.createQueryBuilder()
          .relation(User, "contacts")
          .of(validation)
          .loadMany();

      const filteredContacts = validationRelation.filter(
        (contact) => contact.email == contactValidate.email
      );

      if (filteredContacts.length > 0) {
        throw new AppError("Email already exists in your contacts", 409);
      }
    }
  }

  if (contactParamId) {
    const userContactRepository: Repository<User> = AppDataSource.getRepository(
      "users_contacts_contacts"
    );
    const validation: User | null | undefined =
        await AppDataSource.createQueryBuilder()
          .relation(User, "contacts")
          .of(userId)
          .loadOne();

    if (!validation) {
      throw new AppError("Contact does not exists", 409);
    }
  }

  return next();
};

export const ensureContactIsNew = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number: string = req.body.phone_number;
  const contactParamId = req.params.id;
  const userId: string | null = res.locals.userPermission?.sub;

  if (!userId) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userValidate: User | null = await userRepository
      .createQueryBuilder("contact")
      .select("contact")
      .where("contact.phone_number = :number", { number: number })
      .getOne();

    if (userValidate) {
      throw new AppError("Contact already exists", 409);
    }

    return next();
  }
  if (number) {
    const contactRepository: Repository<Contact> =
      AppDataSource.getRepository(Contact);
    const contactValidate: Contact | null = await contactRepository
      .createQueryBuilder("contact")
      .select("contact")
      .where("contact.phone_number = :number", { number: number })
      .getOne();

    const userContactRepository: Repository<User> =
      AppDataSource.getRepository(User);

    if (contactValidate) {
      const validation: User | null = await userContactRepository
        .createQueryBuilder("user")
        .select("user")
        .where("user.id = :id", {
          id: userId,
        })
        .getOne();

      const validationRelation: User[] | null | undefined =
        await AppDataSource.createQueryBuilder()
          .relation(User, "contacts")
          .of(validation)
          .loadMany();

      const filteredContacts = validationRelation.filter(
        (contact) => contact.phone_number == contactValidate.phone_number
      );

      if (filteredContacts.length > 0) {
        throw new AppError("Phone number already exists in your contacts", 409);
      }
    }
  }

  if (contactParamId) {
    const userContactRepository: Repository<User> = AppDataSource.getRepository(
      "users_contacts_contacts"
    );

    const validation: User[] | null | undefined =
    
        await AppDataSource.createQueryBuilder()
          .relation(User, "contacts")
          .of(userId)
          .loadMany();

      console.log(validation);  
    if (!validation) {
      throw new AppError("Contact does not exists", 409);
    }
  }

  return next();
};
