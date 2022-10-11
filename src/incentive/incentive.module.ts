import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthApiKeyModule } from 'src/auth-apiKey/auth-api-key.module';
import { IncentiveController } from './incentive.controller';
import { IncentiveService } from './incentive.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthApiKeyModule
  ],
  providers: [IncentiveService],
  controllers: [IncentiveController]
})
export class IncentiveModule {}
