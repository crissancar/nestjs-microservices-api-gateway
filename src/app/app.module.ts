import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { CorrelationIdMiddleware } from '../config/middlewares/correlation-id.middleware';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [LoggerModule.forRoot(loggerConfig), ApiKeysModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CorrelationIdMiddleware).forRoutes('*');
	}
}
