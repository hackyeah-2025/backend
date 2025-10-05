import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

export enum LocationType {
  ORIGIN = 'origin',
  DESTINATION = 'destination',
  WAYPOINT = 'waypoint',
}

// ============================================================================
// TASK LOCATION ENTITY
// ============================================================================
@Entity('task_locations')
export class TaskLocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  location: string;

  @Column({
    type: 'enum',
    enum: LocationType,
    default: LocationType.DESTINATION,
  })
  locationType: LocationType;

  @Column({
    type: 'int',
    default: 0,
  })
  orderIndex: number;

  @ManyToOne(() => TaskEntity, (task) => task.locations, {
    onDelete: 'CASCADE',
  })
  task: TaskEntity;
}
