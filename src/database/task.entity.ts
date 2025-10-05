import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItineraryEntity } from './itinerary.entity';
import { TransportDetailsEntity } from './transport_details.entity';
import { TaskLocationEntity } from './task_locations.entity';

export enum TaskType {
  SIMPLE = 'simple',
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  ACTIVITY = 'activity',
}

export enum TaskCategory {
  PACKING = 'packing',
  TRANSPORT = 'transport',
  LODGING = 'lodging',
  ACTIVITY = 'activity',
  BOOKING = 'booking',
  GENERAL = 'general',
}

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.SIMPLE,
  })
  type: TaskType;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  dueDate: Date;

  @Column({
    type: 'bool',
    default: false,
  })
  isCompleted: boolean;

  @Column({
    type: 'int',
    default: 0,
  })
  orderIndex: number;

  @Column({
    type: 'enum',
    enum: TaskCategory,
    default: TaskCategory.GENERAL,
  })
  category: TaskCategory;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ItineraryEntity, (itinerary) => itinerary.tasks, {
    onDelete: 'CASCADE',
  })
  itinerary: ItineraryEntity;

  @OneToOne(() => TransportDetailsEntity, (transport) => transport.task, {
    cascade: true,
    eager: true,
  })
  transportDetails?: TransportDetailsEntity;

  @OneToMany(() => TaskLocationEntity, (location) => location.task, {
    cascade: true,
    eager: true,
  })
  locations?: TaskLocationEntity[];
}
