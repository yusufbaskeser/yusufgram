import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';

export class UserValidations {
  static checkUserExists(user: User | null) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  static async checkOldPasswordMatch(
    oldPassword: string,
    userPassword: string,
  ) {
    const isMatch = await bcrypt.compare(oldPassword, userPassword);

    if (!isMatch) {
      throw new BadRequestException('Old password does not match');
    }
  }
}
