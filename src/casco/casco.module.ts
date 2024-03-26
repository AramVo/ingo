import { Module } from '@nestjs/common';
import { CascoController } from './casco.controller';
import { CascoService } from './casco.service';
import { Casco } from './db/casco.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Casco]),
    AuthModule,
  ],
  controllers: [CascoController],
  providers: [CascoService]
})
export class CascoModule {}
