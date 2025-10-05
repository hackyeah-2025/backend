import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend requests
  app.enableCors({
    origin: 'http://localhost:3000', // or '*' for hackathon speed
  });

  const config = new DocumentBuilder()
    .setTitle('HackYeah! 2025 API')
    .setDescription('API documentation for the HackYeah! 2025 main backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001); // make sure it's not clashing with Next.js
};
void bootstrap();
