import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PlaceEntity } from '../../../database/place.entity';
import { NonFunctionProperties } from '../../../types/non-function-properties.type';

export type ICreatePlaceDto = Omit<
  NonFunctionProperties<PlaceEntity>,
  'id' | 'itinerary'
>;

export class CreatePlaceDto implements ICreatePlaceDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() address: string;
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 10 },
    { message: 'Rating must be a valid number' },
  )
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating: number;

  @IsBoolean() isAccomodation: boolean;
  @IsPositive() price: number;
}
