import { Module } from '@nestjs/common';
import { AuthService } from './auth.serivce';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DeviceTrackingGuard } from 'src/guards/device_tracking.guard';
import { Device } from 'src/entities/device_track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device ,User])],
  providers: [AuthService,DeviceTrackingGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
