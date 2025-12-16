import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '../entities/follow.entity';
import { User } from '../entities/user.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TokenCheckMiddleware } from '../middleware/token-check.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenCheckMiddleware)
      .forRoutes(
        { path: 'users/:userId/follow', method: RequestMethod.POST },
        { path: 'users/:userId/follow', method: RequestMethod.DELETE },
      );
  }
}
