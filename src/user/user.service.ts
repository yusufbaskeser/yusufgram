import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { UserUpdateRequestDto } from './user_Dto/userPassword/userPasswordUpdateRequestDto';
import { UserPasswordUpdateRequestDto } from './user_Dto/userUpdate/userUpdateRequestDto';
import { UserDataResponseDto } from './user_Dto/userData/userDataResponseDto';
import { UserMessageResponseDto } from './user_Dto/userMessage/userMessageResponseDto';
import { UserValidations } from './user_validations/user.validations';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUserById(userId: number): Promise<UserDataResponseDto> {
    const user = await this.userRepo.findOne({
      where: { userId: String(userId) },
    });

    UserValidations.checkUserExists(user);

    return new UserDataResponseDto(user);
  }

  async getUserByUsername(username: string , skip : number , limit : number): Promise<UserDataResponseDto> {
const user = await this.userRepo.find({
  where: { username },
  skip,
  take: limit,
  order: {
    createdAt: 'DESC',
  },
});

    return new UserDataResponseDto(user);
  }

  async deleteUser(userId: number): Promise<UserMessageResponseDto> {
    const user = await this.userRepo.findOne({
      where: { userId: String(userId) },
    });

    UserValidations.checkUserExists(user);

    await this.userRepo.delete(userId);

    return new UserMessageResponseDto('User Deleted Successfully');
  }

  async updateUser(
    userId: number,
    updateDto: UserUpdateRequestDto,
  ): Promise<UserMessageResponseDto> {
    const user = await this.userRepo.findOne({
      where: { userId: String(userId) },
    });

    UserValidations.checkUserExists(user);

    await this.userRepo.update(userId, updateDto);

    return new UserMessageResponseDto('User Updated Successfully');
  }

  async updatePassword(
    userId: number,
    passwordDto: UserPasswordUpdateRequestDto,
  ): Promise<UserMessageResponseDto> {
    const user = await this.userRepo.findOne({
      where: { userId: String(userId) },
    });

    UserValidations.checkUserExists(user);

    await UserValidations.checkOldPasswordMatch(
      passwordDto.oldPassword,
      user!.password,
    );

    const hashed = await bcrypt.hash(passwordDto.newPassword, 10);
    user!.password = hashed;

    await this.userRepo.save(user!);

    return new UserMessageResponseDto('Password Updated Successfully');
  }
}
