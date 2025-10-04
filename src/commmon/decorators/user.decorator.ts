import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../modules/users/user.entity';
import { NonFunctionProperties } from '../../types/non-function-properties.type';

export const User = createParamDecorator(
  (data: keyof NonFunctionProperties<UserEntity>, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const { user } = req as unknown as { user: UserEntity };

    return data ? user[data] : user;
  },
);
