import { IsDate, IsString } from 'class-validator';
import { TaskEntity } from '../../../database/task.entity';
import { Type } from 'class-transformer';

type ICreateTaskDto = Pick<TaskEntity, 'description' | 'dueDate'>;

export class CreateTaskDto implements ICreateTaskDto {
  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;
}
