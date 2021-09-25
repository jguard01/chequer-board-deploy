import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class PostHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        switch (status) {
            case 401:
                response
                    .status(status)
                    .json({
                        statusCode: status,
                        error: "Unautorized User, Please Login Again"
                    });
                break;

        }



    }
}