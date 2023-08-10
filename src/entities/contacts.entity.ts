import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contacts")
class Contact{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @Column({ type: "varchar", length: 45})
    email: string;

    @Column({type: "varchar"})
    phone_number: string;

    @CreateDateColumn({type: "date"})
    crated_at: Date;

}

export default Contact