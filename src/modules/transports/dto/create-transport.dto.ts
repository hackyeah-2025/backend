import {
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransportEntity } from '../../../database/transport.entity';
import { NonFunctionProperties } from '../../../types/non-function-properties.type';

export type ICreateTransportDto = Omit<
  NonFunctionProperties<TransportEntity>,
  'id' | 'itinerary'
>;

export class CreateTransportDto implements ICreateTransportDto {
  @IsString() @IsNotEmpty() name: string;
  @IsPositive() @IsNumber() duration: number;
  @IsPositive() @IsNumber() price: number;
  @IsOptional() @IsBase64() image?: string;
}
