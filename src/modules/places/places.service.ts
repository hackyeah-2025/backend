import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaceEntity } from '../../database/place.entity';
import { ItineraryEntity } from '../../database/itinerary.entity';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlacesService {
  async create(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {
    const newPlace = PlaceEntity.create({ ...createPlaceDto });
    return await newPlace.save();
  }

  async getAllByItineraryId(itineraryId: string): Promise<PlaceEntity[]> {
    const isItineraryExists = await ItineraryEntity.existsBy({
      id: itineraryId,
    });
    if (!isItineraryExists) throw new NotFoundException('Itinerary not found');

    return await PlaceEntity.findBy({ itinerary: { id: itineraryId } });
  }
}
