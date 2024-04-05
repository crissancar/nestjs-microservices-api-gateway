import { ClientProviderOptions } from '@nestjs/microservices';

import { ApiKeyProxies } from '../../../../shared/microservices/api-keys/enums/api-key-client-proxies.enum';
import { ApiKeyQueues } from '../../../../shared/microservices/api-keys/enums/api-key-queues.enum';
import { ClientConfigFactory } from '../../../../shared/microservices/shared/services/client-config-factory.service';

export const apiKeysClientsConfig: Array<ClientProviderOptions> = [
	ClientConfigFactory.create(ApiKeyProxies.AUTH, ApiKeyQueues.AUTH),
];
