import { Module } from '@nestjs/common';
import { IndexModule } from './api/index/index.module';
import { StoreModule } from './api/stores/store.module';

@Module({
  imports: [IndexModule, StoreModule],
})
export class AppModule {}
