import { Module } from '@nestjs/common';
import { CascoController } from './casco.controller';
import { CascoService } from './casco.service';

@Module({
  controllers: [CascoController],
  providers: [CascoService]
})
export class CascoModule {}
