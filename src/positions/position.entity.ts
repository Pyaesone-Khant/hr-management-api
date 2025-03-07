import { Department } from "src/departments/department.entity";
import { Employee } from "src/employees/employee.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(
        () => Department,
        dept => dept.positions
    )
    departments: Department[];

    @OneToMany(
        () => Employee,
        emp => emp.position
    )
    employees: Employee[];
}