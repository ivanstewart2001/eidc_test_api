import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('EIDC API')
  .setDescription('This is a playground for EIDC API')
  .setVersion('1.0')
  .addApiKey({
    type: 'apiKey',
    name: 'X-API-KEY',
    in: 'header'
  }, 'X-API-KEY')
  .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)


  await app.listen(3002);
}
bootstrap();
