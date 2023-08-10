import { NextFunction, Request, Response } from "express";
import { Repository, SelectQueryBuilder } from "typeorm";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";
import { TUser } from "../interfaces/users.interfaces";
import { compare } from "bcryptjs";
import User from "../entities/users.entity";
import { isValidNumber } from "libphonenumber-js";

export const validateUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const emailValidate: User | null = await userRepository
    .createQueryBuilder("user")
    .select("user")
    .where("user.email = :email", { email: email })
    .getOne();

  if (emailValidate) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth: string | undefined = req.headers.authorization;
  if (!auth) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = auth.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.userPermission = decoded;
  });

  return next();
};

export const permissionValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const permission: boolean = res.locals.userPermission.admin;
  console.log(res.locals.userValidate.admin);
  if (!permission && req.body.admin) {
    delete req.body.admin;
  }

  if (!permission && res.locals.userValidate.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  if (
    !permission &&
    res.locals.userValidate.id != res.locals.userPermission.sub
  ) {
    throw new AppError("Insufficient permission", 403);
  }

  if (!permission && req.method != "PATCH" && req.method != "GET") {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};

export const phoneNumberValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.phone_number) {
    const isValid = isValidNumber(req.body.phone_number);

    if (!isValid) {
      throw new AppError("Invalid phone number", 404);
    }

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const numberValidation: TUser | null = await userRepository
      .createQueryBuilder("user")
      .select("user")
      .where("user.phone_number = :number", { number: req.body.phone_number })
      .getOne();

    if (numberValidation && req.path == "/users") {
      throw new AppError("Phone number already exists", 404);
    }
  }

  next();
};

export const isAccountOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.userPermission.sub == req.params.id) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export const ensureIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = +req.params.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const idValidation: TUser | null = await userRepository
    .createQueryBuilder("user")
    .select("user")
    .where("user.id = :id", { id: id })
    .getOne();

  if (!idValidation) {
    throw new AppError("User not found", 404);
  }
  res.locals.userValidate = idValidation;
  return next();
};

export const loginVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: TUser | null = await userRepository
    .createQueryBuilder("user")
    .select("user")
    .where("user.email = :email", { email: req.body.email })
    .getOne();

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.password === req.body.password) {
    res.locals.userId = user.id;
    return next();
  }

  const passwordValidation = await compare(
    req.body.password.toString(),
    user.password.toString()
  );

  if (!passwordValidation) {
    throw new AppError("Invalid credentials", 401);
  }

  res.locals.userId = user.id;

  return next();
};
