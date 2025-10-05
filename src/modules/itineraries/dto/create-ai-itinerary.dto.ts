import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateAiItineraryDto implements ICreateAiItineraryDto {
  @IsString()
  destination: string;

  @IsNumber()
  duration: number;

  @IsString()
  budget: string;

  @IsArray()
  @IsString({ each: true })
  vibes: string[];

  @IsString()
  pace: string;

  @IsString()
  groupType: string;

  @IsString()
  accommodation: string;

  @IsString()
  mustDo: string;

  @IsString()
  dietary: string;
}

export interface ICreateAiItineraryDto {
  destination: string;
  duration: number;
  budget: string;
  vibes: string[];
  pace: string;
  groupType: string;
  accommodation: string;
  mustDo: string;
  dietary: string;
}
