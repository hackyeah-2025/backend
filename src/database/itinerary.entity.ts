import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Continent,
  IItineraryEntity,
} from '../modules/itineraries/itineraries.types';
import { UserEntity } from './user.entity';
import { TaskEntity } from './task.entity';
import { PlaceEntity } from './place.entity';
import { TransportEntity } from './transport.entity';

@Entity('itineraries')
export class ItineraryEntity extends BaseEntity implements IItineraryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'int',
    unsigned: true,
    default: 1,
  })
  duration: number;

  @Column({
    type: 'text',
  })
  category: string;

  @Column({
    type: 'float',
    unsigned: true,
    default: 0,
  })
  budget: number;

  @Column({
    type: 'text',
    enum: Continent,
  })
  continent: Continent;

  @Column({
    type: 'text',
  })
  destination: string;

  @Column({
    type: 'bool',
    default: false,
  })
  highRisk: boolean;

  @Column({
    type: 'bool',
    default: false,
  })
  kidsFriendly: boolean;

  @Column({
    type: 'int',
    unsigned: true,
    default: 1,
  })
  participants: number;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  details?: string;

  @ManyToOne(() => UserEntity, (user) => user.itineraries)
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.itinerary, { eager: true })
  @JoinColumn()
  tasks: TaskEntity[];

  @OneToMany(() => PlaceEntity, (place) => place.itinerary, { eager: true })
  @JoinColumn()
  places: PlaceEntity[];

  @OneToMany(() => TransportEntity, (transport) => transport.itinerary, {
    eager: true,
  })
  @JoinColumn()
  transports: TransportEntity[];
}
