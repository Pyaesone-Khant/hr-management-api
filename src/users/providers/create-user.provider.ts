import { ConflictException, Injectable } from '@nestjs/common';
import { DepartmentsService } from 'src/departments/providers/departments.service';
import { handleException } from 'src/helpers/exception-handler.helper';
import { RandomPasswordGeneratorProvider } from 'src/helpers/random-password-generator.provider';
import { OfficesService } from 'src/offices/offices.service';
import { PositionsService } from 'src/positions/providers/positions.service';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { RolesService } from 'src/roles/roles.service';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByPhoneProvider } from './find-user-by-phone.provider';

@Injectable()
export class CreateUserProvider {

    constructor(
        private readonly dataSource: DataSource,

        private readonly findUserByEmailProvider: FindUserByEmailProvider,

        private readonly findUserByPhoneProvider: FindUserByPhoneProvider,

        private readonly randomPasswordGeneratorProvider: RandomPasswordGeneratorProvider,

        private readonly rolesService: RolesService,

        private readonly departmentsService: DepartmentsService,

        private readonly positionsService: PositionsService,

        private readonly officesService: OfficesService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        let user: User;

        const { email, phone, positionId, officeId, departmentId } = createUserDto;

        // check if email already exists
        user = await this.findUserByEmailProvider.findByEmail(email);
        if (user) {
            throw new ConflictException(`Duplicate email: ${email}!`);
        };

        // check if phone number already exists
        user = await this.findUserByPhoneProvider.findByPhone(phone);
        if (user) {
            throw new ConflictException(`Duplicate phone number: ${phone}!`);
        };

        // generate a random password for the user
        const { password, hashedPassword } = await this.randomPasswordGeneratorProvider.generatePassword(8);

        console.log(`Generated password for user ${email}: ${password}`);

        // assign the default role to the user
        const defaultRole = await this.rolesService.findByName(RoleEnum.EMPLOYEE);
        const position = await this.positionsService.findOne(positionId);
        const department = await this.departmentsService.findOne(departmentId);
        const office = await this.officesService.findOne(officeId);


        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();

            await queryRunner.startTransaction();
        } catch (error) {
            handleException(500, error?.message || 'Failed to connect to the database');
        }

        try {
            user = queryRunner.manager.create(
                User,
                {
                    ...createUserDto,
                    password: hashedPassword,
                    roles: [defaultRole],
                    office,
                    department,
                    position
                }
            );
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            handleException(500, error?.message || 'Failed to create user');
        } finally {
            try {
                await queryRunner.release();
            } catch (error) {
                handleException(500, error?.message || 'Failed to release query runner');
            }
        }

        return user;
    }

}
