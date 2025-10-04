import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltRounds);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
