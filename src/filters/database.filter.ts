import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { UNIQUE_VIOLATION } from 'pg-error-constants';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'Database error';

    if (exception instanceof QueryFailedError) {
      if (exception.driverError.code === UNIQUE_VIOLATION) {
        message = 'User already exists';
        statusCode = HttpStatus.CONFLICT;
      }
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
