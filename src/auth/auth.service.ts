import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto);
        return this.generateToken(user);
    }

    async register(createUserDto: CreateUserDto) {
        const oldUser = await this.usersService.getUserByEmail(createUserDto.email);

        if (oldUser) {
            throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.usersService.create({ ...createUserDto, password: hashedPassword });
        return this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = {
            email: user.email,
            id: user.id
        };

        return {
            token: this.jwtService.sign(payload)
        };
    }

    async validateUser(loginDto: LoginDto) {
        const user = await this.usersService.getUserByEmail(loginDto.email);
        const isPasswordEquals = await bcrypt.compare(loginDto.password, user.password);

        if (user && isPasswordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
}
