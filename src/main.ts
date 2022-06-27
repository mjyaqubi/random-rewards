import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as fs from 'fs';
import { ConfigService } from './common/config/service';
import * as CONFIGS from './common/config/const';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = app.getHttpAdapter();
  const configService = app.get(ConfigService);

  const name = <string>configService.get(CONFIGS.SERVICE_CONFIGS.NAME);
  const desc = <string>configService.get(CONFIGS.SERVICE_CONFIGS.DESCRIPTION);
  const version = <string>configService.get(CONFIGS.SERVICE_CONFIGS.VERSION);
  const apiBaseUrl = <string>(
    configService.get(CONFIGS.SERVICE_CONFIGS.BASE_URL)
  );
  const docsBaseUrl = <string>(
    configService.get(CONFIGS.DOCUMENT_CONFIGS.BASE_URL)
  );
  const docsCredential = {
    [<string>configService.get(CONFIGS.DOCUMENT_CONFIGS.USERNAME)]: <string>(
      configService.get(CONFIGS.DOCUMENT_CONFIGS.PASSWORD)
    ),
  };
  const port = <number>configService.get(CONFIGS.SERVER_CONFIGS.PORT);

  app.setGlobalPrefix(apiBaseUrl);
  app.useGlobalPipes(new ValidationPipe());
  app.use(docsBaseUrl, basicAuth({ challenge: true, users: docsCredential }));

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${desc} | [swagger.json](swagger.json)`)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  fs.writeFileSync(
    `${process.cwd()}/swagger.json`,
    JSON.stringify(document, null, 2),
    { encoding: 'utf8' },
  );

  server.get(`${docsBaseUrl}/swagger.json`, (_req, res) => {
    res.json(document);
  });

  SwaggerModule.setup(docsBaseUrl, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });

  const logger = new Logger('NestApplication');

  try {
    app.enableCors();
    await app.listen(port);
    logger.log(`API endpoints are ready on port (${port})`);
  } catch (error) {
    logger.error('Unable to lunch the API', error);
  }
}
bootstrap();
