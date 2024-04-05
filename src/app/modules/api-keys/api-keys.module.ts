import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { apiKeysClientsConfig } from './config/api-keys-clients.config';
import { ApiKeyAuthenticator } from './services/api-key-authenticator.service';
import { ApiKeyStrategy } from './strategies/api-key.strategy';

@Module({
	imports: [ClientsModule.register(apiKeysClientsConfig)],
	providers: [ApiKeyAuthenticator, ApiKeyStrategy],
})
export class ApiKeysModule {}
