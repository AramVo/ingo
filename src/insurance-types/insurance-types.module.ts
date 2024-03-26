import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { InsuranceTypesController } from './insurance-types.controller';
import { InsuranceTypesService } from './insurance-types.service';
import { InsuranceType } from './db/insurance-type.model';
import { InsuranceFields } from './db/insurance-fields.model';

@Module({
  imports: [SequelizeModule.forFeature([InsuranceType, InsuranceFields])],
  controllers: [InsuranceTypesController],
  providers: [InsuranceTypesService],
  exports: [InsuranceTypesService],
})
export class InsuranceTypesModule {}
