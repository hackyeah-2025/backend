import { UserEntity } from '../../database/user.entity';
import { NonFunctionProperties } from '../../types/non-function-properties.type';

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
  'id' | 'currentToken' | 'isPremium' | 'itineraries'
>;
