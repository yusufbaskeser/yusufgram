import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (request.method !== 'GET') {
      return next.handle();
    }

    const cacheKey = `cache:${request.originalUrl}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) {
      console.log('⚡ REDIS HIT:', cacheKey);
      return of(JSON.parse(cached));
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 60);
      }),
    );
  }
}
