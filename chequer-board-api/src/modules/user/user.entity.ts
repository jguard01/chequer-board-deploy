import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { VirtualColumn } from '../../decorators/virtual-column.decorator';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    fullname: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    phone: string;

    dtoClass = UserDto;
}
