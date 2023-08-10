import { InsertResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import Contact from "../entities/contacts.entity";
import User from "../entities/users.entity";

export const createContactService = async (
  contact: Contact,
  userId: string
): Promise<Contact> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const newContact: InsertResult = await contactRepository
    .createQueryBuilder("contact")
    .insert()
    .values(contact)
    .execute();
  
    const userRepository: Repository<User> =
    AppDataSource.getRepository(User);
    const user: User | null = await userRepository.findOne({where: {id: +userId}})  
  

  const insertedContact: Contact | null = await contactRepository
    .createQueryBuilder("contact")
    .select("contact")
    .where("contact.id = :id", { id: newContact.identifiers[0].id })
    .getOne();

    await AppDataSource.createQueryBuilder()
    .relation(User, "contacts")
    .of(user)
    .add(insertedContact);

  return insertedContact!;
};

export const updateContactService = async (
  id: number,
  updateInfos: Partial<Contact>
) => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const update: UpdateResult = await contactRepository
    .createQueryBuilder("contact")
    .update()
    .set(updateInfos)
    .where("id = :id", { id: id })
    .execute();

  const updatedContact: Contact | null = await contactRepository
    .createQueryBuilder("contact")
    .select("contact")
    .where("contact.id = :id", { id: id })
    .getOne();

  return updatedContact!;
};

export const deleteContactService = async (id: number) => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  await contactRepository
    .createQueryBuilder("contact")
    .delete()
    .where("id = :id", { id: id })
    .execute();
};
