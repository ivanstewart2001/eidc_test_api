import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthApiKeyModule } from 'src/auth-apiKey/auth-api-key.module';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthApiKeyModule
    ],
    providers: [AnnouncementService],
    controllers: [AnnouncementController]
})
export class AnnouncementModule {}
