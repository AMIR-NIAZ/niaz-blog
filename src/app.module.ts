import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/Application/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { userModule } from './User/user.module';
import { BlogModule } from './Blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    userModule,
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
