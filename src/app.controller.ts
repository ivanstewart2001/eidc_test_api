import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Hello World')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiSecurity('X-API-KEY')
  @UseGuards(AuthGuard('api-key'))
  getHello(): string {
    return this.appService.getHello();
  }
}
