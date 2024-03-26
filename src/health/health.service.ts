import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Health } from './db/health.model';
import { CreateHealthDto } from './dto/create-health.dto';

@Injectable()
export class HealthService {
  constructor(@InjectModel(Health) private healthModel: typeof Health) { }

  async findAll(userId: number) {
    return this.healthModel.findAll({
      where: { userId }
    });
  }

  async findById(userId: number, id: number) {
    return this.healthModel.findOne({
      where: { userId, id }
    })
  }

  async create(dto: CreateHealthDto) {
    return this.healthModel.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      age: dto.age,
      healthSpeceficField: dto.healthSpeceficField,
      userId: dto.userId,
    })
  }
}
