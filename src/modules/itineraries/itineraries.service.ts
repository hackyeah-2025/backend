import { Injectable, NotFoundException } from '@nestjs/common';
import { ItineraryEntity } from './itinerary.entity';
import { ItineraryFilters } from './itineraries.types';

@Injectable()
export class ItinerariesService {
  async getAll(): Promise<ItineraryEntity[]> {
    return ItineraryEntity.find();
  }

  async getAllByFilters(filters: ItineraryFilters): Promise<ItineraryEntity[]> {
    const qb = ItineraryEntity.createQueryBuilder('itinerary');

    if (filters.category)
      qb.andWhere('itinerary.category ILIKE :category', {
        category: `%${filters.category}%`,
      });

    if (filters.budget)
      qb.andWhere('itinerary.budget <= :budget', { budget: filters.budget });

    if (filters.duration)
      qb.andWhere('itinerary.duration <= :duration', {
        duration: filters.duration,
      });

    if (filters.continent)
      qb.andWhere('itinerary.continent = :continent', {
        continent: filters.continent,
      });

    if (filters.destination)
      qb.andWhere('itinerary.destination ILIKE :destination', {
        destination: `%${filters.destination}%`,
      });

    if (filters.highRisk !== undefined)
      qb.andWhere('itinerary.highRisk = :highRisk', {
        highRisk: filters.highRisk,
      });

    if (filters.kidsFriendly !== undefined)
      qb.andWhere('itinerary.kidsFriendly = :kidsFriendly', {
        kidsFriendly: filters.kidsFriendly,
      });

    if (filters.participants)
      qb.andWhere('itinerary.participants >= :participants', {
        participants: filters.participants,
      });

    return qb.getMany();
  }

  async getById(id: string): Promise<ItineraryEntity> {
    const itinerary = await ItineraryEntity.findOneBy({ id });
    if (!itinerary) throw new NotFoundException('Itinerary not found');
    return itinerary;
  }
}
