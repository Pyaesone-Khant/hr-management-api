import { Role } from "src/roles/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    // @Column({
    //     type: 'varchar',
    //     length: 255,
    //     unique: true
    // })
    // employeeId: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        // select: false // Do not select this field by default
    })
    password: string;

    @ManyToMany(
        () => Role,
        (role) => role.users,
        {
            cascade: true,
        }
    )
    @JoinTable()
    roles: Role[];
}