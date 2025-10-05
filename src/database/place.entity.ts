import {
  BaseEntity,
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItineraryEntity } from './itinerary.entity';

export type IPlaceEntity = {
  name: string;
  address: string;
  rating: number; // float from 0 to 5
  isAccomodation: boolean;
  price: number;
};

@Entity('places')
export class PlaceEntity extends BaseEntity implements IPlaceEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'float',
    unsigned: true,
    default: null,
    nullable: true,
  })
  @Check(`"rating" >= 0 AND "rating" <= 5`)
  rating: number;

  @Column({
    type: 'bool',
    default: false,
  })
  isAccomodation: boolean;

  @Column({
    type: 'int',
    unsigned: true,
  })
  price: number;

  @ManyToOne(() => ItineraryEntity, (itinerary) => itinerary.places)
  itinerary: ItineraryEntity;
}
