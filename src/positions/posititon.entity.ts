import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: "varchar",
        length: 256,
        nullable: true,
    })
    description?: string;
}