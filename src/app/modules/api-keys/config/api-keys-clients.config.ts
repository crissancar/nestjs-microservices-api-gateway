import { ClientProviderOptions } from '@nestjs/microservices';

import { ApiKeyProxies } from '../../../../shared/app/modules/api-keys/enums/api-key-client-proxies.enum';
import { ApiKeyQueues } from '../../../../shared/app/modules/api-keys/enums/api-key-queues.enum';
import { ClientConfigFactory } from '../../../../shared/app/modules/shared/services/client-config-factory.service';

export const apiKeysClientsConfig: Array<ClientProviderOptions> = [
	ClientConfigFactory.create(ApiKeyProxies.AUTH, ApiKeyQueues.AUTH),
];
