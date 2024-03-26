import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { InsuranceType } from './db/insurance-type.model';
import { CreateInsuranceTypeDto } from './dto/create-insurance-type.dto';
import { InsuranceFields } from './db/insurance-fields.model';
import { CreateInsuranceFieldDto } from './dto/create-insurance-field.dto';

@Injectable()
export class InsuranceTypesService {
  constructor(
    @InjectModel(InsuranceType) private insuranceTypeModel: typeof InsuranceType,
    @InjectModel(InsuranceFields) private insuranceFieldsModel: typeof InsuranceFields,
  ) { }

  async findAll() {
    return this.insuranceTypeModel.findAll({ include: { all: true } });
  }

  async create(dto: CreateInsuranceTypeDto) {
    return this.insuranceTypeModel.create({
      name: dto.name,
      path: dto.path
    });
  }

  async createField(dto: CreateInsuranceFieldDto) {
    return this.insuranceFieldsModel.create({
      name: dto.name,
      valueType: dto.valueType,
      typeId: dto.typeId,
    });
  }

  async update(id: number, dto: CreateInsuranceTypeDto) {
    return this.insuranceTypeModel.update(
      dto,
      { where: { id } },
    );
  }

  async updateField(id: number, dto: CreateInsuranceFieldDto) {
    return this.insuranceFieldsModel.update(
      dto,
      { where: { id } },
    );
  }

  async delete(id: number) {
    return this.insuranceTypeModel.destroy({ where: { id } })
  }

  async deleteField(id: number) {
    return this.insuranceFieldsModel.destroy({ where: { id } })
  }
}
