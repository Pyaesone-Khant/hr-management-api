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
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 256,
        nullable: true,
    })
    description?: string;
}