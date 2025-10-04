import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUserEntity } from '../modules/users/users.types';
import { ItineraryEntity } from './itinerary.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 320,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 60,
  })
  password: string;

  @Column({
    default: false,
    type: 'bool',
  })
  halalOnly: boolean;

  @Column({
    default: false,
    type: 'bool',
  })
  vegan: boolean;

  @Column({
    default: false,
    type: 'bool',
  })
  kosherOnly: boolean;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  currentToken?: string | null;

  @Column({
    type: 'bool',
    default: false,
  })
  isPremium: boolean;

  @OneToMany(() => ItineraryEntity, (itinerary) => itinerary.user)
  @JoinColumn()
  itineraries: ItineraryEntity[];
}
