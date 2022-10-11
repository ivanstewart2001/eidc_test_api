import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthApiKeyModule } from './auth-apiKey/auth-api-key.module'
import { UserModule } from './user/user.module';
import { ParticipantModule } from './participant/participant.module';
import { IncentiveController } from './incentive/incentive.controller';
import { IncentiveModule } from './incentive/incentive.module';
import { AnnouncementController } from './announcement/announcement.controller';
import { SurveyController } from './survey/survey.controller';
import { SurveyService } from './survey/survey.service';
import { AnnouncementService } from './announcement/announcement.service';
import { AnnouncementModule } from './announcement/announcement.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthApiKeyModule,
    ProjectsModule,
    UserModule,
    ParticipantModule,
    IncentiveModule,
    AnnouncementModule,
    SurveyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
