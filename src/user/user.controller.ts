import { Controller, Get, Param, Delete, Put, Body , Query} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateRequestDto } from './user_Dto/userPassword/userPasswordUpdateRequestDto';
import { UserPasswordUpdateRequestDto } from './user_Dto/userUpdate/userUpdateRequestDto';
import { UserDataResponseDto } from './user_Dto/userData/userDataResponseDto';
import { UserMessageResponseDto } from './user_Dto/userMessage/userMessageResponseDto';

@Controller({path :'user' , version : '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getUserById(@Param('userId') userId: number): Promise<UserDataResponseDto> {
    return this.userService.getUserById(userId);
  }

  @Get('username/:username')
  getUserByUsername(
    @Query('skip') skip = '0',
    @Query('limit') limit = '10',
    @Param('username') username: string,
  ): Promise<UserDataResponseDto> {
    return this.userService.getUserByUsername(username,Number(skip),
    Number(limit));
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: number): Promise<UserMessageResponseDto> {
    return this.userService.deleteUser(userId);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: number,
    @Body() updateDto: UserUpdateRequestDto,
  ): Promise<UserMessageResponseDto> {
    return this.userService.updateUser(userId, updateDto);
  }

  @Put('changePassword/:userId')
  updatePassword(
    @Param('userId') userId: number,
    @Body() passwordDto: UserPasswordUpdateRequestDto,
  ): Promise<UserMessageResponseDto> {
    return this.userService.updatePassword(userId, passwordDto);
  }
}
