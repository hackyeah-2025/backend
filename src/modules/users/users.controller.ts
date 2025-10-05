import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../common/decorators/user.decorator';
import { Auth } from '../../common/decorators/auth.decorator';
import { UserEntity } from '../../database/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  @Auth()
  @Get('/is-premium')
  @HttpCode(HttpStatus.OK)
  isPremium(@User() user: UserEntity): { isPremium: boolean } {
    return this.usersService.checkIsPremium(user);
  }
}
