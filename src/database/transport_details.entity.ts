import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

export enum TransportMode {
  UBER = 'uber',
  TAXI = 'taxi',
  WALK = 'walk',
  FLIGHT = 'flight',
  TRAIN = 'train',
  BUS = 'bus',
  CAR_RENTAL = 'car_rental',
  FERRY = 'ferry',
  SUBWAY = 'subway',
}

// ============================================================================
// TRANSPORT DETAILS ENTITY
// ============================================================================
@Entity('transport_details')
export class TransportDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransportMode,
  })
  transportMode: TransportMode;

  @Column({
    type: 'varchar',
    length: 500,
  })
  fromLocation: string; // "JFK Airport Terminal 4" - pass to Google Maps

  @Column({
    type: 'varchar',
    length: 500,
  })
  toLocation: string; // "Hotel Paradiso, 123 Main St, Brooklyn, NY" - pass to Google Maps

  @Column({
    type: 'int',
    nullable: true,
  })
  estimatedDurationMinutes: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  bookingReference: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  departureTime: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  arrivalTime: Date;

  // Relation
  @OneToOne(() => TaskEntity, (task) => task.transportDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  task: TaskEntity;
}
