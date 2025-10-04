import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { Auth } from '../../common/decorators/auth.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserEntity } from '../../database/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Auth()
  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@User() user: UserEntity): Promise<void> {
    return this.authService.logout(user);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.usersService.register(registerUserDto);
  }
}
