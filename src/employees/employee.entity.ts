import { Department } from "src/departments/department.entity";
import { EmployeePosition } from "src/employee-positions/employee-postition.entity";
import { Leave } from "src/leaves/leave.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    joinedDate: Date

    @OneToMany(
        () => Leave,
        leave => leave.employee,
        {
            eager: true
        }
    )
    leaves: Leave[];

    @ManyToOne(
        () => EmployeePosition,
        pos => pos.employees,
        {
            eager: true
        }
    )
    position: EmployeePosition;

    @ManyToOne(
        () => Department,
        dep => dep.employees,
        {
            eager: true
        }
    )
    department: Department;
}