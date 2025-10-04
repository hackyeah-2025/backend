import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { User } from '../../commmon/decorators/user.decorator';
import { Auth } from '../../commmon/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }

  // @Post('/')
  // @HttpCode(HttpStatus.CREATED)
  // register(@Body() registerUserDto: RegisterUserDto): Promise<UserEntity> {
  //   return this.usersService.register(registerUserDto);
  // }

  @Auth()
  @Post('/make-premium')
  @HttpCode(HttpStatus.OK)
  makePremium(@User() user: UserEntity): Promise<UserEntity> {
    return this.usersService.makePremium(user);
  }
}
