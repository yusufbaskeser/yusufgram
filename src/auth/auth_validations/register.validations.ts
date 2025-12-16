import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { BadRequestException, ConflictException } from '@nestjs/common';

export async function validateRegister(
  userRepo: Repository<User>,
  username: string,
  email: string,
  password: string,
) {
  if (!username || !username.trim()) {
    throw new BadRequestException('Username cannot be empty');
  }

  if (!email || !email.trim()) {
    throw new BadRequestException('Email cannot be empty');
  }

  if (!password || password.length < 6) {
    throw new BadRequestException('Password must be at least 6 characters');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestException('Invalid email format');
  }

  const existingUser = await userRepo.findOne({
    where: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ConflictException('Email already exists');
    }
    if (existingUser.username === username) {
      throw new ConflictException('Username already exists');
    }
  }
}
