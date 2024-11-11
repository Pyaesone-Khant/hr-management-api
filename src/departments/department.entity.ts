import { Employee } from "src/employees/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {

    @PrimaryGeneratedColumn({
        type: 'bigint'
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
    description: string;

    @OneToMany(
        () => Employee,
        emp => emp.department,
    )
    employees: Employee[];
}