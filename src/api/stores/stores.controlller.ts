import { Controller, Get } from '@nestjs/common';
import { StoreService } from './stores.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('get-forbidden-exception')
  getForbiddenException(): void {
    return this.storeService.getForbiddenException();
  }
}
