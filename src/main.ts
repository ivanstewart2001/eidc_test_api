import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000

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


  // await app.listen(3000);

  app.enableCors(); // protection
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
bootstrap();
