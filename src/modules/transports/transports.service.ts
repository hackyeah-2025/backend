import { Injectable, NotFoundException } from '@nestjs/common';
import { TransportEntity } from '../../database/transport.entity';
import { ItineraryEntity } from '../../database/itinerary.entity';
import { CreateTransportDto } from './dto/create-transport.dto';

@Injectable()
export class TransportsService {
  async getAllByItineraryId(itineraryId: string): Promise<TransportEntity[]> {
    const isItineraryExists = await ItineraryEntity.existsBy({
      id: itineraryId,
    });
    if (!isItineraryExists) throw new NotFoundException('Itinerary not found');

    return await TransportEntity.findBy({ itinerary: { id: itineraryId } });
  }

  async create(
    createTransportDto: CreateTransportDto,
  ): Promise<TransportEntity> {
    const newTransport = TransportEntity.create({ ...createTransportDto });
    return await newTransport.save();
  }
}
