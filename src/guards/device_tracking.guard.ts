import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Device } from '../entities/device_track.entity';
import { User } from '../entities/user.entity'

@Injectable()
export class DeviceTrackingGuard implements CanActivate {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const user = (req as any).user;
    if (!user) return true;

    const deviceType = req.headers['x-device-type'] as string;
    const modelName = req.headers['x-model-name'] as string;

    if (!deviceType || !modelName) return true;

    const dbUser = await this.userRepo.findOneBy({
      userId: user.userId,
    });
    if (!dbUser) return true;

    let device = await this.deviceRepo.findOne({
      where: {
        user: { userId: dbUser.userId },
        deviceType,
        modelName,
      },
      relations: ['user'],
    });

    if (!device) {
      device = this.deviceRepo.create({
        user: dbUser,
        deviceType,
        modelName,
        lastUsedAt: new Date(),
      });
    } else {
      device.lastUsedAt = new Date();
    }

    await this.deviceRepo.save(device);

    return true;
  }
}
