import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LeaveType {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: "int",
        nullable: false
    })
    days: number

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    description?: string;
}