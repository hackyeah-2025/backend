import { NonFunctionProperties } from '../../types/non-function-properties.type';
import { UserEntity } from './user.entity';

export interface IUserEntity {
  id: string;
  email: string;
  password: string;
  halalOnly: boolean;
  vegan: boolean;
  kosherOnly: boolean;
  isPremium: boolean;
}

export type IRegisterUserDto = Omit<
  NonFunctionProperties<UserEntity>,
  'id' | 'currentToken' | 'isPremium'
>;
