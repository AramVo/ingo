import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { CascoService } from './casco.service';
import { CreateCascoDto } from './dto/create-casco.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('casco')
export class CascoController {
  constructor(private cascoService: CascoService) {}

  @Get()
  findAll(@Req() req) {
    return this.cascoService.findAll(req.user.id);
  }

  @Get(':id')
  findById(@Req() req, @Param('id') id: string) {
    return this.cascoService.findById(req.user.id, +id);
  }

  @Post()
  create(@Body() createCascoDto: CreateCascoDto) {
    return this.cascoService.create(createCascoDto);
  }
}
