import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Casco } from './db/casco.model';
import { CreateCascoDto } from './dto/create-casco.dto';

@Injectable()
export class CascoService {
  constructor(@InjectModel(Casco) private cascoModel: typeof Casco) { }

  async findAll(userId: number) {
    return this.cascoModel.findAll({
      where: { userId }
    });
  }

  async findById(userId: number, id: number) {
    return this.cascoModel.findOne({
      where: { userId, id }
    })
  }

  async create(dto: CreateCascoDto) {
    return this.cascoModel.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      car: dto.car,
      cascoSpeceficField: dto.cascoSpeceficField,
      userId: dto.userId,
    })
  }
}
