import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from '@database/database.module';
import { API_PREFIX_PATH } from '@configs/app.config';

import { CryptoKeyCommand } from './crypto-key.command';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/public'),
      exclude: [`${API_PREFIX_PATH}/(.*)`],
    }),
    CommandModule,
    DatabaseModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [CryptoKeyCommand],
})
export class AppCommandModule {}
