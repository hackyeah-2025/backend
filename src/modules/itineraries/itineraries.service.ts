import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItineraryEntity } from '../../database/itinerary.entity';
import { ItineraryFilters } from './itineraries.types';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { TasksService } from '../tasks/tasks.service';
import { TaskEntity } from '../../database/task.entity';
import { PlaceEntity } from '../../database/place.entity';
import { PlacesService } from '../places/places.service';
import { TransportEntity } from '../../database/transport.entity';
import { TransportsService } from '../transports/transports.service';
import { CreateAiItineraryDto } from './dto/create-ai-itinerary.dto';
import fetch from 'node-fetch';

@Injectable()
export class ItinerariesService {
  constructor(
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,

    @Inject(forwardRef(() => PlacesService))
    private readonly placesService: PlacesService,

    @Inject(forwardRef(() => TransportsService))
    private readonly transportsService: TransportsService,
  ) {}

  async getAll(): Promise<ItineraryEntity[]> {
    return ItineraryEntity.find();
  }

  async getAllByFilters({
    category,
    budget,
    duration,
    continent,
    destination,
    highRisk,
    kidsFriendly,
    participants,
    title,
  }: ItineraryFilters): Promise<ItineraryEntity[]> {
    const qb = ItineraryEntity.createQueryBuilder('itinerary');

    if (category)
      qb.andWhere('itinerary.category ILIKE :category', {
        category: `%${category}%`,
      });

    if (budget) qb.andWhere('itinerary.budget <= :budget', { budget });

    if (duration)
      qb.andWhere('itinerary.duration <= :duration', {
        duration,
      });

    if (continent)
      qb.andWhere('itinerary.continent = :continent', {
        continent,
      });

    if (destination)
      qb.andWhere('itinerary.destination ILIKE :destination', {
        destination: `%${destination}%`,
      });

    if (highRisk)
      qb.andWhere('itinerary.highRisk = :highRisk', {
        highRisk,
      });

    if (kidsFriendly)
      qb.andWhere('itinerary.kidsFriendly = :kidsFriendly', {
        kidsFriendly,
      });

    if (participants)
      qb.andWhere('itinerary.participants >= :participants', {
        participants,
      });

    if (title)
      qb.andWhere('itinerary.title ILIKE :title', { title: `%${title}%` });

    return qb.getMany();
  }

  async getById(id: string): Promise<ItineraryEntity> {
    const itinerary = await ItineraryEntity.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!itinerary) throw new NotFoundException('Itinerary not found');
    return itinerary;
  }

  async create({
    tasks,
    places,
    transports,
    ...rest
  }: CreateItineraryDto): Promise<ItineraryEntity> {
    const newItinerary = ItineraryEntity.create({ ...rest });
    await newItinerary.save();

    const createdTasks: TaskEntity[] = await Promise.all(
      tasks.map(async (task) => await this.tasksService.create(task)),
    );
    newItinerary.tasks = createdTasks;

    const createdPlaces: PlaceEntity[] = await Promise.all(
      places.map(async (place) => await this.placesService.create(place)),
    );
    newItinerary.places = createdPlaces;

    const createdTransports: TransportEntity[] = await Promise.all(
      transports.map(
        async (transport) => await this.transportsService.create(transport),
      ),
    );
    newItinerary.transports = createdTransports;

    await newItinerary.save();

    return newItinerary;
  }

  async createWithAi(
    createAiItineraryDto: CreateAiItineraryDto,
  ): Promise<unknown> {
    const res = await fetch('http://72.60.176.150:8000/ai/generateIteary', {
      method: 'POST',
      body: JSON.stringify(createAiItineraryDto),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await res.json();

    return body;
  }
}
