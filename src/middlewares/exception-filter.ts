/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { forwardToWebhook } from 'src/shared/forwardToWebhook';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request) as string,
    };

    const errorDetails: {
      event_name: string;
      message: string;
      status: 'success' | 'error';
    } = {
      event_name: 'Error',
      message: exception instanceof Error ? exception.message : 'Unknown error',
      status: 'success',
      // stack: exception instanceof Error ? exception.stack : 'No stack trace',
      // statusCode: httpStatus,
      // path: (request as { url?: string }).url,
      // method: (request as { method?: string }).method,
      // timestamp: new Date().toISOString(),
    };

    await forwardToWebhook('ERROR_TRACING', errorDetails);

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
