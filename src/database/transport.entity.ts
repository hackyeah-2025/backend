import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItineraryEntity } from './itinerary.entity';

export interface ITransportEntity {
  name: string;
  duration: number; // in minutes
  price: number;
  image?: string; // base64
}

@Entity('transports')
export class TransportEntity extends BaseEntity implements ITransportEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  duration: number;

  @Column({
    type: 'float',
    unsigned: true,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  image?: string;

  @ManyToOne(() => ItineraryEntity, (itinerary) => itinerary.transports)
  itinerary: ItineraryEntity;
}
