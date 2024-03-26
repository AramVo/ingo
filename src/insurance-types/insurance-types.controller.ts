import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateInsuranceTypeDto } from './dto/create-insurance-type.dto';
import { InsuranceTypesService } from './insurance-types.service';
import { CreateInsuranceFieldDto } from './dto/create-insurance-field.dto';

// TODO: Create AdminGuard
@Controller('insurance-types')
export class InsuranceTypesController {
  constructor(private insuranceTypesService: InsuranceTypesService) { }

  @Get()
  findAll() {
    return this.insuranceTypesService.findAll();
  }

  @Post()
  create(@Body() createInsuranceTypeDto: CreateInsuranceTypeDto) {
    return this.insuranceTypesService.create(createInsuranceTypeDto);
  }

  @Post('field')
  createField(@Body() createInsuranceFieldDto: CreateInsuranceFieldDto) {
    return this.insuranceTypesService.createField(createInsuranceFieldDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createInsuranceTypeDto: CreateInsuranceTypeDto) {
    return this.insuranceTypesService.update(+id, createInsuranceTypeDto);
  }

  @Patch('field/:id')
  updateField(@Param('id') id: string, @Body() createInsuranceFieldDto: CreateInsuranceFieldDto) {
    return this.insuranceTypesService.updateField(+id, createInsuranceFieldDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.insuranceTypesService.delete(+id);
  }

  @Delete('field/:id')
  deleteField(@Param('id') id: string) {
    return this.insuranceTypesService.deleteField(+id);
  }
}
