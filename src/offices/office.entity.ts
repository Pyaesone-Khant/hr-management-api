import { User } from "src/users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Office {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: "decimal",
        scale: 6,
        default: 0.00
    })
    longitude: number;

    @Column({
        type: "decimal",
        scale: 6,
        default: 0.00
    })
    latitude: number;

    @Column({
        type: "boolean",
        default: false,
        name: "is_active"
    })
    isActive: boolean;

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
        name: "address"
    })
    address: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at"
    })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        name: "updated_at"
    })
    updatedAt: Date;

    @OneToMany(
        () => User,
        (user) => user.office,
    )
    users: User[];
}