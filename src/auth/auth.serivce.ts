import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginRequestDto } from './dto/loginDto/loginRequestDto';
import { RegisterRequestDto } from './dto/registerDto/registerRequestDto';
import { LoginResponseDto } from './dto/loginDto/loginResponseDto';
import { RegisterResponseDto } from './dto/registerDto/registerResponseDto';
import { validateLogin } from './auth_validations/login.validations';
import { validateRegister } from './auth_validations/register.validations';
import { hashPassword } from '../utils/hashPassword';
import { generateJwtToken } from '../utils/generateJwtToken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(
    registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const { username, email, password, dateOfBirth, gender } = registerDto;

    await validateRegister(this.userRepository, username, email, password);

    const hashedPassword = await hashPassword(password);

    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      dateOfBirth: new Date(dateOfBirth),
      gender,
    });

    await this.userRepository.save(newUser);

    const token = generateJwtToken({
      sub: newUser.userId,
      email: newUser.email,
      username: newUser.username,
    });

    return {
      token,
      message: 'User registered successfully',
    };
  }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;

    const user = await validateLogin(this.userRepository, username, password);

    const token = generateJwtToken({
      sub: user.userId,
      email: user.email,
      username: user.username,
    });

    return {
      token,
      message: 'Login successful',
    };
  }
}
