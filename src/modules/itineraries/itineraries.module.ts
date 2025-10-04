import { forwardRef, Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';

@Module({
  imports: [forwardRef(() => TasksModule)],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, TasksService],
})
export class ItinerariesModule {}
