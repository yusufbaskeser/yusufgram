import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {dbConfig} from './config/config';
import { redisConfig } from './config/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
    isGlobal: true,
    load: [() => ({ redis: redisConfig })],
     }),

     RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('redis.url');
        return {
          type: 'single',
          url: redisUrl,
        };
      },
    }),

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
