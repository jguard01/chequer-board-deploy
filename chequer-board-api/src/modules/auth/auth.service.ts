import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../../config';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/user.entity'
import { UserLoginDto } from './dto/UserLoginDto';
import { LoginPayloadDto } from './dto/LoginPayloadDto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) { }

    async createToken(user: UserEntity): Promise<LoginPayloadDto> {
        const expiresTime: number = Number(this.configService.get('JWT_EXPIRATION_TIME'));
        const expiresIn = new Date();
        expiresIn.setTime(expiresIn.getTime() + expiresTime);
        return new LoginPayloadDto(user.toDto(), {
            expiresIn,
            accessToken: this.jwtService.sign({ id: user.id }),
        });
    }

    async validateUser(payload: UserLoginDto): Promise<any> {
        const user = await this.userService.findByUsername(payload.username);

        if (!user || !Hash.compare(payload.password, user.password)) {
            throw new UnauthorizedException('Invalid credentials!');
        }
        return user;
    }
}
