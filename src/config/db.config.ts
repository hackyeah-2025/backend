import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (env: ConfigService) => ({
    type: 'postgres',
    host: env.get<string>('DB_HOST', 'localhost'),
    port: env.get<number>('DB_PORT', 5432),
    username: env.get<string>('DB_USERNAME', 'postgres'),
    password: env.get<string>('DB_PASSWORD', 'postgres'),
    database: env.get<string>('DB_NAME', 'hackyeah_2025'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }),
};
