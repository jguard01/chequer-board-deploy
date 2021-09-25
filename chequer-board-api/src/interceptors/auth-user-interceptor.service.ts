import type {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import type { UserEntity } from '../modules/user/user.entity';
import { ContextProvider } from '../providers/context.provider';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const response = context.switchToHttp().getResponse();

        const user = <UserEntity>response.user;
        ContextProvider.setAuthUser(user);

        return next.handle();
    }
}
