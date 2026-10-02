import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import NotValidInputException from '../../Domain/Exceptions/NotValidInput.exception';
import AlreadyExistsException from '../../Domain/Exceptions/AlreadyExists.exception';
import NotFoundException from '../../Domain/Exceptions/NotFound.exception';
import UnauthorizedException from 'src/Common/Domain/Exceptions/Unauthorized.exception';
import ForbiddenException from 'src/Common/Domain/Exceptions/Forbidden.exception';
import { InValidOperationException } from 'src/Common/Domain/Exceptions/InvalidOperation.exception';

interface ResolvedError {
  status: number;
  message: unknown;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const { status, message } = this.resolve(exception);
    const path = httpAdapter.getRequestUrl(request);

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const method = httpAdapter.getRequestMethod(request);
      this.logger.error(
        `${method} ${path}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    httpAdapter.reply(
      response,
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path,
        message,
      },
      status,
    );
  }

  private resolve(exception: unknown): ResolvedError {
    if (exception instanceof NotValidInputException) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: exception.errorMessages,
      };
    }
    if (exception instanceof NotFoundException) {
      return { status: HttpStatus.NOT_FOUND, message: exception.message };
    }
    if (exception instanceof AlreadyExistsException) {
      return { status: HttpStatus.CONFLICT, message: exception.message };
    }
    if (exception instanceof UnauthorizedException) {
      return { status: HttpStatus.UNAUTHORIZED, message: exception.message };
    }
    if (exception instanceof ForbiddenException) {
      return { status: HttpStatus.FORBIDDEN, message: exception.message };
    }
    if (exception instanceof InValidOperationException) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: exception.message,
      };
    }
    
    if (exception instanceof HttpException && exception.getStatus() !== 500) {
      return {
        status: exception.getStatus(),
        message: exception.getResponse(),
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL_SERVER_ERROR',
    };
  }
}
