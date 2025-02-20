import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  getForbiddenException() {
    throw new ForbiddenException('Forbidden', 'Your not allowed this service');
  }
}
