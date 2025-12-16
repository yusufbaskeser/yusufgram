import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export async function validateLogin(
  userRepo: Repository<User>,
  usernameOrEmail: string,
  password: string,
) {
  if (!usernameOrEmail?.trim() || !password?.trim()) {
    throw new BadRequestException(
      'Username/Email and password cannot be empty',
    );
  }

  const user = await userRepo.findOne({
    where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return user;
}
