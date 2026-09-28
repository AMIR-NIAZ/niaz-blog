import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './Application/Ports/User.repository';
import { RegisterImpl } from './Application/UseCases/Commands/Register/Register.impl';
import { HashService } from 'src/Common/Application/Output/Hash.service';
import { Argon2HashService } from 'src/Common/Infrastructure/Output/Argon2Hash.service';
import { Publisher } from 'src/Common/Application/Output/Publisher.service';
import { UserController } from './Infrastructure/Input/Http/Controllers/User.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from 'src/Common/Application/Output/Cache.service';
import { NestCacheService } from 'src/Common/Infrastructure/Output/NestCache.service';
import { VerifyEmailImpl } from './Application/UseCases/Commands/VerifyEmail/VerifyEmail.impl';
import { TokenService } from 'src/Common/Application/Output/Token.service';
import { JwtAppService } from 'src/Common/Infrastructure/Output/JwtToken.service';
import { JwtService } from '@nestjs/jwt';
import { LoginImpl } from './Application/UseCases/Queries/Login/Login.impl';
import { RabbitMQPublisher } from 'src/Common/Infrastructure/Output/RabbitMQ.publisher';
import { RabbitMQModule } from 'src/Common/Infrastructure/Output/RabbitMQ.module';
import { TypeOrmUserEntity } from './Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.entity';
import { TypeOrmUserRepository } from './Infrastructure/Output/Persistence/TypeOrm/TypeOrmUser.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    CacheModule.register(),
    RabbitMQModule,
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: TokenService,
      useClass: JwtAppService,
    },
    {
      provide: HashService,
      useClass: Argon2HashService,
    },
    {
      provide: Publisher,
      useExisting: RabbitMQPublisher,
    },
    {
      provide: CacheService,
      useClass: NestCacheService,
    },
    JwtService,
    RegisterImpl,
    VerifyEmailImpl,
    LoginImpl,
  ],
})
export class UserModule {}
