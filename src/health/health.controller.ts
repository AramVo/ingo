import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  findAll(@Req() req) {
    return this.healthService.findAll(req.user.id);
  }

  @Get(':id')
  findById(@Req() req, @Param('id') id: string) {
    return this.healthService.findById(req.user.id, +id);
  }

  @Post()
  create(@Body() createHealthDto: CreateHealthDto) {
    return this.healthService.create(createHealthDto);
  }
}
