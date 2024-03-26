import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/db/user.model';
import { AuthModule } from './auth/auth.module';
import { CascoModule } from './casco/casco.module';
import { InsuranceTypesController } from './insurance-types/insurance-types.controller';
import { InsuranceTypesModule } from './insurance-types/insurance-types.module';
import { InsuranceType } from './insurance-types/db/insurance-type.model';
import { InsuranceFields } from './insurance-types/db/insurance-fields.model';

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
            InsuranceFields
          ],
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CascoModule,
    InsuranceTypesModule,
  ],
  controllers: [AppController, InsuranceTypesController],
  providers: [AppService],
})
export class AppModule { }
