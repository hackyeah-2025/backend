import { Continent } from '../itineraries.types';
import {
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetItinerariesQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  budget?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsEnum(Continent)
  continent?: Continent;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  highRisk?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  kidsFriendly?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  participants?: number;
}
