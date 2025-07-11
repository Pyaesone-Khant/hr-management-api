import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
    })
    name: string;

    @ManyToMany(
        () => User,
        (user) => user.roles,
    )
    users: User[];
}