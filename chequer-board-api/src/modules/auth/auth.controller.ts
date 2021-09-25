import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserService } from './../user/user.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { CustomHttpExceptionFilter } from '../exception/CustomHttpExceptionFilter';


@Controller('auth')
@ApiTags('authentication')
@UseFilters(new CustomHttpExceptionFilter())
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }


    @Post('login')
    @ApiResponse({ status: 201, description: 'Successful Login' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async login(@Body() payload: UserLoginDto): Promise<LoginPayloadDto> {
        const user = await this.authService.validateUser(payload);
        return await this.authService.createToken(user);
    }

    @Post('register')
    @ApiResponse({ status: 201, description: 'Successful Registration' })
    @ApiResponse({ status: 400, description: 'Bad Request' })

    async register(@Body() payload: UserRegisterDto): Promise<any> {
        const user = await this.userService.createUser(payload);
        return await this.authService.createToken(user);
    }

}
function AllExceptionFilter(AllExceptionFilter: any) {
    throw new Error('Function not implemented.');
}

