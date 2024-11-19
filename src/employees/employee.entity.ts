import { Department } from "src/departments/department.entity";
import { LeaveType } from "src/leave-types/leave-type.entity";
import { Leave } from "src/leaves/leave.entity";
import { Position } from "src/positions/position.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmploymentStatus } from "./enums/employment-status.enum";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    nrc: string

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    mobileNumber: string;

    @Column({
        type: 'varchar',
        length: 256,
    })
    email?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    address: string;

    @Column({
        type: 'date',
        nullable: false
    })
    dob: Date;

    @Column({
        enum: EmploymentStatus,
        nullable: false,
        default: EmploymentStatus.PROBATION
    })
    employmentStatus: string;

    @Column({
        type: 'date',
        nullable: false
    })
    startDate: Date

    @Column({
        type: 'date',
        nullable: true
    })
    endDate: Date

    @Column({
        type: "int",
        nullable: false,
    })
    salary: number;

    @OneToMany(
        () => Leave,
        leave => leave.employee,
    )
    leaves: Leave[];

    @ManyToOne(
        () => Department,
        dep => dep.employees,
        {
            eager: true
        }
    )
    department: Department;

    @ManyToOne(
        () => Position,
        pos => pos.employees,
        {
            eager: true
        }
    )
    position: Position

    @ManyToMany(
        () => LeaveType,
    )
    @JoinTable({
        name: 'employee_leave_types'
    })
    leaveTypes: LeaveType[];
}