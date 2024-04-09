import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { ApiKeyAuthenticator } from './application/services/api-key-authenticator.service';
import { apiKeysClientsConfig } from './config/api-keys-clients.config';
import { ApiKeyStrategy } from './infrastructure/strategies/api-key.strategy';

@Module({
	imports: [ClientsModule.register(apiKeysClientsConfig)],
	providers: [ApiKeyAuthenticator, ApiKeyStrategy],
})
export class ApiKeysModule {}
