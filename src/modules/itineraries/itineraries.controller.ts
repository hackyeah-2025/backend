import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItineraryEntity } from '../../database/itinerary.entity';
import { GetItinerariesPipe } from './pipes/get-itineraries.pipe';
import { GetItinerariesQueryDto } from './dto/get-itineraries-query.dto';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { TasksService } from '../tasks/tasks.service';
import { CreateAiItineraryDto } from './dto/create-ai-itinerary.dto';

@Controller('itineraries')
export class ItinerariesController {
  constructor(
    private readonly itinerariesService: ItinerariesService,
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query(GetItinerariesPipe) query: GetItinerariesQueryDto,
  ): Promise<ItineraryEntity[]> {
    return !Object.keys(query).length
      ? this.itinerariesService.getAll()
      : this.itinerariesService.getAllByFilters(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<ItineraryEntity> {
    return this.itinerariesService.getById(id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createItineraryDto: CreateItineraryDto,
  ): Promise<ItineraryEntity> {
    return this.itinerariesService.create(createItineraryDto);
  }

  @Patch('/:id/complete-tasks')
  @HttpCode(HttpStatus.NO_CONTENT)
  completeTasks(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.setAsCompletedByItineraryId(id);
  }

  @Post('/ai/generate')
  @HttpCode(HttpStatus.CREATED)
  createWithAi(
    @Body() createAiItineraryDto: CreateAiItineraryDto,
  ): Promise<unknown> {
    return this.itinerariesService.createWithAi(createAiItineraryDto);
  }
}
