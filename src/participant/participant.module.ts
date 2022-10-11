import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthApiKeyModule } from 'src/auth-apiKey/auth-api-key.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthApiKeyModule
  ],
  providers: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
