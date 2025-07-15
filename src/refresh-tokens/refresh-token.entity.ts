import { Type } from "class-transformer";
import { User } from "src/users/user.entity";
import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        unique: true,
        nullable: false
    })
    @Generated("uuid")
    token: string;

    @Column({
        type: "timestamp",
        nullable: false,
        default: () => `('${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}'::timestamp)` // Default to 7 days from now
    })
    expiresAt: Date;

    @OneToOne(
        () => User,
        user => user.refreshToken,
    )
    @JoinColumn()
    @Type(() => User)
    user: User
}