import { NonFunctionProperties } from '../../types/non-function-properties.type';
import { UserEntity } from './user.entity';

export interface IUserEntity {
  id: string;
  email: string;
  password: string;
  halalOnly: boolean;
  vegan: boolean;
  kosherOnly: boolean;
}

export type IRegisterUserDto = Omit<NonFunctionProperties<UserEntity>, 'id'>;
