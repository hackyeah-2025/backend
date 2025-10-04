import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from './users.types';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 320,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 60,
  })
  password: string;

  @Column({
    default: false,
    type: 'bool',
  })
  halalOnly: boolean;

  @Column({
    default: false,
    type: 'bool',
  })
  vegan: boolean;

  @Column({
    default: false,
    type: 'bool',
  })
  kosherOnly: boolean;
}
