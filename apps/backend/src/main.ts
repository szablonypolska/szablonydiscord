import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PublicModule } from './public-api/public.module';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
  });

  const config = new DocumentBuilder()
    .setTitle('Szablony Discord API')
    .setDescription(
      'Szablonydiscord API – allows you to integrate your services with our template API. Free with high limits! ' +
        '\n\nTo obtain your API key, please generate it in your account panel and include it in the "x-api-key" header.',
    )
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      include: [PublicModule],
    });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
