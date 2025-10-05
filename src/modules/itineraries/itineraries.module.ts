import { forwardRef, Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { TasksModule } from '../tasks/tasks.module';
import { TasksService } from '../tasks/tasks.service';
import { PlacesModule } from '../places/places.module';
import { PlacesService } from '../places/places.service';

@Module({
  imports: [forwardRef(() => TasksModule), forwardRef(() => PlacesModule)],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, TasksService, PlacesService],
})
export class ItinerariesModule {}
