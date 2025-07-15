import { Exclude } from "class-transformer";
import { RefreshToken } from "src/refresh-tokens/refresh-token.entity";
import { Role } from "src/roles/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @Exclude()
    password: string;

    @ManyToMany(
        () => Role,
        (role) => role.users,
        {
            eager: true,
            cascade: true,
        }
    )
    @JoinTable()
    roles: Role[];

    @OneToOne(
        () => RefreshToken,
        (refreshToken) => refreshToken.user,
    )
    refreshToken: RefreshToken;
}