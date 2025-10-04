import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItineraryEntity } from './itinerary.entity';
import { GetItinerariesPipe } from './pipes/get-itineraries.pipe';
import { GetItinerariesQueryDto } from './dto/get-itineraries-query.dto';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query(GetItinerariesPipe) query: GetItinerariesQueryDto,
  ): Promise<ItineraryEntity[]> {
    if (!Object.keys(query).length) {
      return this.itinerariesService.getAll();
    }
    return this.itinerariesService.getAllByFilters(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ItineraryEntity> {
    return this.itinerariesService.getById(id);
  }
}
