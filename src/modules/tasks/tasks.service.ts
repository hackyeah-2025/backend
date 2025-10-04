import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from '../../database/task.entity';
import { ItineraryEntity } from '../../database/itinerary.entity';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const newTask = TaskEntity.create({ ...createTaskDto });
    return await newTask.save();
  }

  async setAsCompletedByItineraryId(itineraryId: string): Promise<void> {
    const itirenary = await ItineraryEntity.findOneBy({ id: itineraryId });
    if (!itirenary) throw new NotFoundException('Itinerary not found');
    await TaskEntity.update(
      { itinerary: { id: itineraryId }, isCompleted: false },
      { isCompleted: true },
    );
  }
}
