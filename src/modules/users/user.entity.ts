import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUserEntity {
  id: string;
  email: string;
  password: string;
  halalOnly: boolean;
  vegan: boolean;
  kosherOnly: boolean;
}

@Entity('users')
export class UserEntity extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 320,
  })
  email: string;

  @Column({
    type: 'text',
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
