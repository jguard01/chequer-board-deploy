import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class UserNameHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status == 500) {
            response
                .status(status)
                .json({
                    statusCode: status,
                    error: "Username is Duplicated"
                });
        }

        else if (status == 401) {
            response
                .status(status)
                .json({
                    statusCode: status,
                    error: "Unknown ID or Password"
                });
        }

    }
}