import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(UserEntity.table_name)
export class UserEntity {
    public static table_name = 'user' as const;

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "text" })
    firstName!: string

    @Column({ type: "text" })
    lastName!: string

    @Column({ type: "int" })
    age!: number
}