import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { TokenCheckMiddleware } from '../middleware/token-check.middleware';
import { Follow } from 'src/entities/follow.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Follow, Category])],
  providers: [PostService],
  controllers: [PostsController],
  exports: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenCheckMiddleware)
      .forRoutes(
        { path: 'posts/feed', method: RequestMethod.GET },
        { path: 'posts', method: RequestMethod.POST },
      );
  }
}
