import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashingModule } from '../../common/services/hashing/hashing.module';
import { HashingService } from '../../common/services/hashing/hashing.service';

@Module({
  imports: [forwardRef(() => HashingModule)],
  controllers: [UsersController],
  providers: [UsersService, HashingService],
  exports: [UsersService],
})
export class UsersModule {}
