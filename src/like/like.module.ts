import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../entities/like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Post } from '../entities/post.entity';
import { TokenCheckMiddleware } from '../middleware/token-check.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenCheckMiddleware)
      .forRoutes(
        { path: 'posts/:postId/like', method: RequestMethod.POST },
        { path: 'posts/:postId/like', method: RequestMethod.DELETE },
      );
  }
}
