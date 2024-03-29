import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './feature/user/user.module';
import { PostModule } from './feature/post/post.module';
import { AuthModule } from './core/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './core/auth/jwt.auth.guard';
​
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:'localhost',
      port:3306,
      username:"root",
      password:"123456",
      database:"checkdata",
      
      autoLoadEntities:true,
      synchronize:true
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 启用全局身份校验，切记除了没有用@Public装饰器修饰的所有请求，都要携带token
    // {
    //   provide:APP_GUARD,
    //   useClass:JwtAuthGuard
    // }
  ],
})
export class AppModule {}