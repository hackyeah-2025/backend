import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { HashingService } from '../../common/services/hashing/hashing.service';
import { UserEntity } from '../../database/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) { }

  async login({ email, password }: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserLoginDataByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await this.hashingService.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('User not found');

    const payload = { sub: user.id, email: user.email };
    const token: string = await this.jwtService.signAsync(payload);
    user.currentToken = token;
    await user.save();
    return { accessToken: token };
  }

  async logout(user: UserEntity): Promise<void> {
    user.currentToken = null;
    await user.save();
  }
}
