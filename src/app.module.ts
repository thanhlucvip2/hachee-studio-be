import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { NoXPoweredByMiddleware } from '@middlewares/no-x-powered-by.middleware';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes('*');
  }
}
