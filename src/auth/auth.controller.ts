import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('/register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }
}
