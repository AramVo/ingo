import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { Health } from './db/health.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Health]),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [HealthService]
})
export class HealthModule {}
