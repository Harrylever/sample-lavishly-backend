import { Module } from '@nestjs/common';
import { StoreController } from './stores.controlller';
import { StoreService } from './stores.service';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
