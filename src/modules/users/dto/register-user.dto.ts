import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IRegisterUserDto } from '../users.types';

export class RegisterUserDto implements IRegisterUserDto {
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
  @IsOptional() @IsBoolean() halalOnly: boolean;
  @IsOptional() @IsBoolean() vegan: boolean;
  @IsOptional() @IsBoolean() kosherOnly: boolean;
}
