import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { HashingService } from '../../common/services/hashing/hashing.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../database/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => HashingService))
    private readonly hashingService: HashingService,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return UserEntity.findOneBy({ id }) ?? null;
  }

  async getUserLoginDataByEmail(email: string): Promise<UserEntity | null> {
    return (
      (await this.dataSource
        .getRepository(UserEntity)
        .createQueryBuilder('u')
        .addSelect(['u.id', 'u.email', 'u.password'])
        .where('u.email = :email', { email })
        .getOne()) ?? null
    );
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

  async makePremium(userToMakePremium: UserEntity): Promise<UserEntity> {
    userToMakePremium.isPremium = true;
    return await userToMakePremium.save();
  }
}
