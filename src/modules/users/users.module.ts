import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashingModule } from '../../commmon/services/hashing/hashing.module';
import { HashingService } from '../../commmon/services/hashing/hashing.service';

@Module({
  imports: [forwardRef(() => HashingModule)],
  controllers: [UsersController],
  providers: [UsersService, HashingService],
  exports: [UsersService],
})
export class UsersModule {}
