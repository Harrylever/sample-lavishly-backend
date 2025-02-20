import { Body, Controller, Post } from '@nestjs/common';
import { ErrorTracingDto } from './dtos/error-tracing.dto';
import { ErrorTracingService } from './error-tracing.service';

@Controller('error_tracing')
export class ErrorTracingController {
  constructor(private readonly errorTracingService: ErrorTracingService) {}

  @Post('target_url')
  async traceErrorHandler(@Body() body: ErrorTracingDto) {
    const response = await this.errorTracingService.traceErrorRepeater(body);
    return response;
  }
}
