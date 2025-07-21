import { Exclude } from "class-transformer";
import { Department } from "src/departments/department.entity";
import { Office } from "src/offices/office.entity";
import { Position } from "src/positions/position.entity";
import { RefreshToken } from "src/refresh-tokens/refresh-token.entity";
import { Role } from "src/roles/role.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Exclude()
    password: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true,
        unique: true
    })
    phone: string;

    @Column({
        type: "date",
        nullable: true,
    })
    dob: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    address: string;

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

    @Column({
        type: 'boolean',
        default: true,
        nullable: false,
        name: 'is_active',
    })
    isActive: boolean;

    @ManyToOne(
        () => Office,
        (office) => office.users,
        {
            eager: true,
            cascade: true,
            onDelete: "NO ACTION",
            nullable: true
        }
    )
    office: Office;

    @ManyToOne(
        () => Department,
        (department) => department.users,
        {
            eager: true,
            cascade: true,
            onDelete: "NO ACTION",
            nullable: true
        }
    )
    department: Department;

    @ManyToOne(
        () => Position,
        (position) => position.users,
        {
            eager: true,
            cascade: true,
            onDelete: "NO ACTION",
            nullable: true
        }
    )
    position: Position;
}