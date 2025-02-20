import { Module } from '@nestjs/common';
import { IndexModule } from './api/index/index.module';

@Module({
  imports: [IndexModule],
})
export class AppModule {}
