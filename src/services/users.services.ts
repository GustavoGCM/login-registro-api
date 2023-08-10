import {
    InsertResult,
    Repository,
    UpdateResult,
  } from "typeorm";
import {
TUserResponse,
} from "../interfaces/users.interfaces";

import { AppDataSource } from "../data-source";
import { hashSync } from "bcryptjs";
import User from "../entities/users.entity";

export const createUserService = async (user: User): Promise<TUserResponse> => {
const userRepository: Repository<User> = AppDataSource.getRepository(User);

user.password = hashSync(user.password, 10);

const newUser: InsertResult = await userRepository
    .createQueryBuilder("user")
    .insert()
    .values(user)
    .execute();

const insertedUser: TUserResponse | null = await userRepository
    .createQueryBuilder("user")
    .select("user")
    .where("user.id = :id", { id: newUser.identifiers[0].id })
    .getOne();


delete insertedUser!.password;

return insertedUser!;
};

export const deleteUserService = async (id: number) => {
const userRepository: Repository<User> = AppDataSource.getRepository(User);
userRepository
    .createQueryBuilder("user")
    .softDelete()
    .where("user.id = :id", { id: id })
    .execute();
};

export const updateUserService = async (id: number, updateInfos: User) => {
if (updateInfos.password) {
    updateInfos.password = hashSync(updateInfos.password, 10);
}

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const update: UpdateResult = await userRepository
    .createQueryBuilder("user")
    .update()
    .set(updateInfos)
    .where("id = :id", { id: id })
    .execute();

const updatedUser: TUserResponse | null = await userRepository
    .createQueryBuilder("user")
    .select("user")
    .where("user.id = :id", { id: id })
    .getOne();

delete updatedUser!.password;

return updatedUser!;
};

export const readUsersService = async (): Promise<TUserResponse[]> => {
const userRepository: Repository<User> = AppDataSource.getRepository(User);
const users: User[] | null = await userRepository.createQueryBuilder("users")
.select("*")
.getRawMany()

const readUsers: TUserResponse[] = users.map((user) => {
    const { password, ...rest} = user
    if (!rest.admin) {
    rest.admin = false
    }

    return rest
}) 

return readUsers
}