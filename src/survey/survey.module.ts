import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthApiKeyModule } from 'src/auth-apiKey/auth-api-key.module';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthApiKeyModule
    ],
    providers: [SurveyService],
    controllers: [SurveyController]
})
export class SurveyModule {}
