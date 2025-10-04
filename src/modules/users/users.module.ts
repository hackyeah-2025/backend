import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashingModule } from '../../commmon/hashing/hashing.module';
import { HashingService } from '../../commmon/hashing/hashing.service';

@Module({
  imports: [forwardRef(() => HashingModule)],
  controllers: [UsersController],
  providers: [UsersService, HashingService],
})
export class UsersModule {}
