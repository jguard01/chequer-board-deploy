import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import type { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import type { UserDto } from './dto/user-dto';
import type { UsersPageOptionsDto } from './dto/users-page-options.dto';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        public readonly validatorService: ValidatorService,
    ) { }

    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }
    async findById(id: string) {
        return this.userRepository.findOne({ id });
    }

    async findByUsername(
        username: string,
    ): Promise<UserEntity | undefined> {
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', {
                username,
            });

        return queryBuilder.getOne();
    }

    async createUser(
        userRegisterDto: UserRegisterDto,
    ): Promise<UserEntity> {
        if (6 > (userRegisterDto.password.length)) {
            throw new HttpException('Password is longer than 6 characters', 401);
        }
        try {
            const user = this.userRepository.create(userRegisterDto);
            return this.userRepository.save(user);
        }
        catch (error) {
            throw new HttpException('Username is Duplicated', 500);
        }
    }

    async getUsers(
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<PageDto<UserDto>> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const { items, pageMetaDto } = await queryBuilder.paginate(pageOptionsDto);

        return items.toPageDto(pageMetaDto);
    }

    async getUser(userId: string): Promise<UserDto> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        queryBuilder.where('user.id = :userId', { userId });

        const userEntity = await queryBuilder.getOne();

        return userEntity.toDto();
    }
}

