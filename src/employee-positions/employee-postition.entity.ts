import { Employee } from "src/employees/employee.entity";
import { Position } from "src/positions/position.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeePosition {

    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number;

    @Column({
        type: 'date',
        nullable: false
    })
    startDate: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    endDate: Date;

    @ManyToMany(
        () => Employee,
        emp => emp.id,
        {
            onDelete: 'CASCADE',
            eager: true
        }
    )
    employees: Employee[];

    @ManyToMany(
        () => Position,
        pos => pos.id,
        {
            onDelete: 'CASCADE',
            eager: true
        }
    )
    positions: Position[];
}