import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';

@Module({
  providers: [TransportsService],
  exports: [TransportsService],
})
export class TransportsModule {}
