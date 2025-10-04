import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { GetItinerariesQueryDto } from '../dto/get-itineraries-query.dto';

@Injectable()
export class GetItinerariesPipe implements PipeTransform {
  transform(value: any) {
    const dto = plainToInstance(GetItinerariesQueryDto, value, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(dto).filter(([_, v]) => v !== undefined && v !== null),
    );
  }
}
