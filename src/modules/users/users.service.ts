import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { HashingService } from '../../commmon/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => HashingService))
    private readonly hashingService: HashingService,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async register({
    email,
    password,
    ...rest
  }: RegisterUserDto): Promise<UserEntity> {
    const isEmailTaken = await UserEntity.existsBy({ email });
    if (isEmailTaken) throw new ConflictException('Email is already taken');

    const newUser = UserEntity.create({
      email,
      password: await this.hashingService.hash(password),
      ...rest,
    });
    return await newUser.save();
  }
}
