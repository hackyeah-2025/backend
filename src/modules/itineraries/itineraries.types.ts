import { UserEntity } from '../users/user.entity';
import { ItineraryEntity } from './itinerary.entity';

export interface IItineraryEntity {
  category: string;
  duration: number;
  budget: number;
  continent: Continent;
  destination: string; // city with country
  highRisk: boolean;
  kidsFriendly: boolean;
  participants: number;
  user: UserEntity;
}

export enum Continent {
  EUROPE = 'Europe',
  ASIA = 'Asia',
  AFRICA = 'Africa',
  NORTH_AMERICA = 'North America',
  SOUTH_AMERICA = 'South America',
  AUSTRALIA = 'Australia',
  ANTARCTICA = 'Antarctica',
}

export type ItineraryFilters = Partial<
  Pick<
    ItineraryEntity,
    | 'category'
    | 'budget'
    | 'duration'
    | 'continent'
    | 'destination'
    | 'highRisk'
    | 'kidsFriendly'
    | 'participants'
  >
>;
