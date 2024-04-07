import { ClientProviderOptions } from '@nestjs/microservices';

import { ClientConfigFactory } from '../../../../shared/app/modules/shared/services/client-config-factory.service';
import { UserProxies } from '../../../../shared/app/modules/users/enums/user-proxies.enum';
import { UserQueues } from '../../../../shared/app/modules/users/enums/user-queues.enum';

export const usersClientsConfig: Array<ClientProviderOptions> = [
	ClientConfigFactory.create(UserProxies.CREATE, UserQueues.CREATE),
	ClientConfigFactory.create(UserProxies.FIND_BY_ID, UserQueues.FIND_BY_ID),
	ClientConfigFactory.create(UserProxies.FIND_BY_CRITERIA, UserQueues.FIND_BY_CRITERIA),
	ClientConfigFactory.create(UserProxies.FIND_RAW_BY_OPTIONS, UserQueues.FIND_RAW_BY_OPTIONS),
	ClientConfigFactory.create(UserProxies.UPDATE, UserQueues.UPDATE),
	ClientConfigFactory.create(UserProxies.SOFT_DELETE, UserQueues.SOFT_DELETE),
];
