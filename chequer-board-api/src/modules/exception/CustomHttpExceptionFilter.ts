import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        switch (status) {
            case 422:
                response
                    .status(status)
                    .json({
                        statusCode: 422,
                        error: "Input is invalid , "
                    });
                break;

            case 500:
                response
                    .status(status)
                    .json({
                        statusCode: status,
                        error: "Username is Duplicated"
                    });
                break;

            case 401:
                response
                    .status(status)
                    .json({
                        statusCode: status,
                        error: "Unknown ID or Password"
                    });
                break;

            case 404:
                response
                    .status(status)
                    .json({
                        statusCode: status,
                        error: "NOT FOUND"
                    });
                break;

        }



    }
}