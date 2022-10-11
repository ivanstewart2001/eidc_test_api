import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthApiKeyModule } from 'src/auth-apiKey/auth-api-key.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthApiKeyModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
