import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ItineraryEntity } from '../../../database/itinerary.entity';
import { NonFunctionProperties } from '../../../types/non-function-properties.type';
import { CreateTaskDto } from '../../tasks/dto/create-task.dto';
import { Continent } from '../itineraries.types';
import { Type } from 'class-transformer';
import { CreatePlaceDto } from '../../places/dto/create-place.dto';
import { CreateTransportDto } from '../../transports/dto/create-transport.dto';

export type ICreateItineraryDto = Omit<
  NonFunctionProperties<ItineraryEntity>,
  'id' | 'user' | 'tasks' | 'places' | 'transports'
> & {
  tasks: CreateTaskDto[];
  places: CreatePlaceDto[];
  transports: CreateTransportDto[];
};

export class CreateItineraryDto implements ICreateItineraryDto {
  @IsString() @IsNotEmpty() title: string;
  @Type(() => Number) @IsPositive() @IsInt() duration: number;
  @IsString() @IsNotEmpty() category: string;
  @IsPositive() budget: number;
  @IsEnum(Continent) continent: Continent;
  @IsString() @IsNotEmpty() destination: string;
  @IsBoolean() highRisk: boolean;
  @IsBoolean() kidsFriendly: boolean;
  @IsPositive() @IsInt() participants: number;
  @Type(() => CreateTaskDto)
  @ValidateNested({ each: true })
  tasks: CreateTaskDto[];

  @IsJSON()
  details?: string;

  @Type(() => CreatePlaceDto)
  @ValidateNested({ each: true })
  places: CreatePlaceDto[];

  @Type(() => CreateTransportDto)
  @ValidateNested({ each: true })
  transports: CreateTransportDto[];
}
