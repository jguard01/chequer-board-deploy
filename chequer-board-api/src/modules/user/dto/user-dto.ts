import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    id: string;

    @ApiPropertyOptional()
    username: string;

    @ApiPropertyOptional()
    fullname: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    constructor(user: UserEntity) {
        super(user);
        this.id = user.id;
        this.username = user.username;
        this.fullname = user.fullname;
        this.email = user.email;
        this.phone = user.phone;
    }
}
