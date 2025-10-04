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

export type ICreateItineraryDto = Omit<
  NonFunctionProperties<ItineraryEntity>,
  'id' | 'user' | 'tasks'
> & { tasks: CreateTaskDto[] };

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
}
