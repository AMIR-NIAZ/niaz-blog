import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './common/Application/Typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './User/User.module';
import { BlogModule } from './Blog/Blog.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
