import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CascoModule } from './casco/casco.module';
import { InsuranceTypesModule } from './insurance-types/insurance-types.module';

import { User } from './users/db/user.model';
import { InsuranceType } from './insurance-types/db/insurance-type.model';
import { InsuranceFields } from './insurance-types/db/insurance-fields.model';
import { Casco } from './casco/db/casco.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: configService.get('NODE_ENV') === 'dev',
          sync: { alter: configService.get('NODE_ENV') === 'dev' },
          autoLoadModels: true,
          models: [
            User,
            InsuranceType,
            InsuranceFields,
            Casco
          ],
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CascoModule,
    InsuranceTypesModule,
    CascoModule,
  ],
})
export class AppModule { }
