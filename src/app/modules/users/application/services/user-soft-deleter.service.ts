import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { EventPayloadFactory } from '../../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../../shared/app/modules/users/enums/user-proxies.enum';
import { usersConfig } from '../../config/users.config';
import { SoftDeleteUserFailedException } from '../../domain/exceptions/soft-delete-user-failed.exception';
import { SoftDeleteUserRequest } from '../dtos/soft-delete-user-request.dto';
import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';

const { softDeleter } = usersConfig;
const { context } = softDeleter.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserSoftDeleter {
	constructor(@Inject(UserProxies.SOFT_DELETE) private readonly proxy: ClientProxy) {}

	async run(request: SoftDeleteUserRequest): Promise<SoftDeleteUserResponse> {
		const payload = EventPayloadFactory.create(UserDomainEvents.SOFT_DELETE, request);

		try {
			const softDeletedUser$ = this.proxy
				.send<SoftDeleteUserResponse>(UserDomainEvents.SOFT_DELETE, payload)
				.pipe(timeout(10000));

			return await firstValueFrom(softDeletedUser$);
		} catch (error) {
			logger.error(error);
			throw new SoftDeleteUserFailedException(context);
		}
	}
}
