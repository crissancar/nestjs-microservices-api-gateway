import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { UsersModule } from '../users/users.module';
import { Authenticator } from './application/services/authenticator.service';
import { JwtCreator } from './application/services/jwt-creator.service';
import { authClientsConfig } from './config/auth-clients.config';
import { jwtConfig } from './config/jwt.config';
import { AuthPostController } from './infrastructure/controllers/auth-post.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';

@Module({
	imports: [
		JwtModule.register(jwtConfig),
		ClientsModule.register(authClientsConfig),
		ApiKeysModule,
		UsersModule,
		PassportModule,
	],
	controllers: [AuthPostController],
	providers: [Authenticator, JwtCreator, JwtStrategy, LocalStrategy],
	exports: [JwtCreator],
})
export class AuthModule {}
