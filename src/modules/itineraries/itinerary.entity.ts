import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { Continent, IItineraryEntity } from './itineraries.types';

@Entity('itineraries')
export class ItineraryEntity extends BaseEntity implements IItineraryEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

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

  @ManyToOne(() => UserEntity, (user) => user.itineraries)
  user: UserEntity;
}
