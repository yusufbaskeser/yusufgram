import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TokenCheckMiddleware } from '../middleware/token-check.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenCheckMiddleware)
      .forRoutes(
        { path: 'posts/:postId/comments', method: RequestMethod.POST },
        { path: 'comments/:commentId', method: RequestMethod.DELETE },
      );
  }
}
