import { Module } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexController } from './index.controller';

@Module({
  imports: [],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
