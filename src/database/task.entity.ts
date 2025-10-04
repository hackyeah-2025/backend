import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItineraryEntity } from './itinerary.entity';

interface ITaskEntity {
  description: string;
  isCompleted: boolean;
  dueDate: Date;
}

@Entity('tasks')
export class TaskEntity extends BaseEntity implements ITaskEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'bool',
    default: false,
  })
  isCompleted: boolean;

  @Column({
    type: 'timestamp with time zone',
  })
  dueDate: Date;

  @ManyToOne(() => ItineraryEntity, (itinerary) => itinerary.tasks)
  itinerary: ItineraryEntity;
}
