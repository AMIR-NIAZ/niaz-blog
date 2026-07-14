import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Infrastructure/Output/TypeOrm/user.entity';
import { UserRepository } from './Application/Output/UserRepsitory';
import { TypeOrmUserRepository } from './Infrastructure/Output/TypeOrm/TypeOrm.repository';
import { RegisterImpl } from './Application/UseCase/Commands/register/RegisterImpl';
import { HashService } from 'src/common/Application/Output/HashService';
import { Argon2HashService } from 'src/common/Infrastructure/Output/Argon2Hash.service';
import { Publisher } from 'src/common/Application/Output/Publisher';
import { KafkaPublisher } from 'src/common/Infrastructure/Output/KafkaPublisher';
import { KafkaModule } from 'src/common/Infrastructure/Output/kafka.module';
import { UserController } from './Infrastructure/Input/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from 'src/common/Application/Output/CacheService';
import { NestCacheService } from 'src/common/Infrastructure/Output/NestCache.service';
import { VerifyEmailCommand } from './Application/UseCase/Commands/verifyEmail/verifyEmailCommond';
import { VerifyEmailImpl } from './Application/UseCase/Commands/verifyEmail/verifyEmailImpl';
import { TokenService } from 'src/common/Application/Output/TokenService';
import { JwtAppService } from 'src/common/Infrastructure/Output/JwtToken.service';
import { JwtService } from '@nestjs/jwt';
import { LoginImpl } from './Application/UseCase/Queries/Login/LoginImpl';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CacheModule.register(),
    KafkaModule,
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
      useExisting: KafkaPublisher,
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
export class userModule {}
