import { ClientProviderOptions } from '@nestjs/microservices';

import { AuthProxies } from '../../../../shared/microservices/auth/enums/auth-proxies.enum';
import { AuthQueues } from '../../../../shared/microservices/auth/enums/auth-queues.enum';
import { ClientConfigFactory } from '../../../../shared/microservices/shared/services/client-config-factory.service';

export const authClientsConfig: Array<ClientProviderOptions> = [
	ClientConfigFactory.create(AuthProxies.AUTH_API_KEY, AuthQueues.AUTH_API_KEY),
	ClientConfigFactory.create(AuthProxies.AUTH_USER, AuthQueues.AUTH_USER),
	ClientConfigFactory.create(AuthProxies.CREATE_TOKENS, AuthQueues.CREATE_TOKENS),
];
