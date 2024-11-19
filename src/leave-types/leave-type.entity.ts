import { Leave } from "src/leaves/leave.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        type: "varchar",
        length: 255,
        nullable: false,
        unique: true
    })
    slug: string;

    @Column({
        type: "int",
        nullable: false
    })
    totalDays: number

    @Column({
        type: "int",
        nullable: false
    })
    takeableConsecDaysLimit: number

    @Column({
        type: "varchar",
        length: 255,
        nullable: true,
    })
    description?: string;

    @OneToMany(
        () => Leave,
        leave => leave.leaveType
    )
    leaves: Leave[];
}