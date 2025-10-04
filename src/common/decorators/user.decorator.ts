import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NonFunctionProperties } from '../../types/non-function-properties.type';
import { UserEntity } from '../../database/user.entity';

export const User = createParamDecorator(
  (data: keyof NonFunctionProperties<UserEntity>, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const { user } = req as unknown as { user: UserEntity };

    return data ? user[data] : user;
  },
);
