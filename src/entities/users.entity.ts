import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Contact from "./contacts.entity";

@Entity("users")
class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 45 })
    name: string;
  
    @Column({ type: "varchar", length: 45, unique: true })
    email: string;
  
    @Column({ default: false })
    admin: boolean;
  
    @Column({ type: "varchar", length: 120 })
    password: string;

    @Column({type: "varchar", unique: true})
    phone_number: string
  
    @CreateDateColumn({type: "date"})
    createdAt: Date;
  
    @UpdateDateColumn({type: "date"})
    updatedAt: Date;
  
    @DeleteDateColumn({ nullable: true, type: "date" })
    deletedAt: Date;
  
    @ManyToMany(() => Contact)
    @JoinTable()
    contacts: Contact[];
  }

  export default User
