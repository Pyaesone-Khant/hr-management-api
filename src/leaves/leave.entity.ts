import { Employee } from "src/employees/employee.entity";
import { LeaveType } from "src/leave-types/leave-type.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Leave {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    reason: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    description?: string;

    @Column({
        type: "date",
        nullable: false
    })
    startDate: Date;

    @Column({
        type: "date",
        nullable: false
    })
    endDate: Date;

    @ManyToOne(
        () => LeaveType,
        leaveType => leaveType.id,
        {
            eager: true,
        }
    )
    leaveType: LeaveType;

    @ManyToOne(
        () => Employee,
        emp => emp.leaves,
    )
    employee: Employee;
}