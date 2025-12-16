import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.serivce';
import { LoginRequestDto } from './dto/loginDto/loginRequestDto';
import { RegisterRequestDto } from './dto/registerDto/registerRequestDto';
import { LoginResponseDto } from './dto/loginDto/loginResponseDto';
import { RegisterResponseDto } from './dto/registerDto/registerResponseDto';

@Controller({path :'auth' , version : '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }
}
