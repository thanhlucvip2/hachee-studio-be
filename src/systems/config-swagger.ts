import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function configSWagger(app: INestApplication) {
  const configSwagger = new DocumentBuilder()
    .setTitle('Hachee Studio')
    .setDescription('Hachee project 2023')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', in: 'header' }, 'token')
    .build();

  const customOptions: SwaggerCustomOptions = {
    // Đặt đường dẫn toàn cục (GlobalPrefix)
    // Ví dụ: '/api'
    url: '/dasdas',
    useGlobalPrefix: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Documentation',
  };

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, document, customOptions);
  SwaggerModule.setup('swagger', app, document);
}
