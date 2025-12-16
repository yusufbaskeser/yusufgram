import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { dbConfig } from './config/config';
import { RedisCacheInterceptor } from './interceptors/redis-cache.interceptor';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>('REDIS_URL'),
      }),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig.DB_HOST,
      port: parseInt(dbConfig.DB_PORT || '5432', 10),
      username: dbConfig.DB_USER,
      password: dbConfig.DB_PASSWORD,
      database: dbConfig.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      ssl: dbConfig.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),

    AuthModule,
    UserModule,
    PostModule,
    LikeModule,
    FollowModule,
    CommentModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RedisCacheInterceptor,
    },
  ],
})
export class AppModule {}