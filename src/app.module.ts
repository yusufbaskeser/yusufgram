import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig.DB_HOST,
      port: parseInt(dbConfig.DB_PORT || '5432', 10),
      username: dbConfig.DB_USER,
      password: dbConfig.DB_PASSWORD,
      database: dbConfig.DB_NAME,
      synchronize: true,
      ssl: dbConfig.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
  ],
})
export class AppModule {}
