import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { EventPayloadFactory } from '../../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../../shared/app/modules/users/enums/user-proxies.enum';
import { usersConfig } from '../../config/users.config';
import { UpdateUserFailedException } from '../../domain/exceptions/update-user-failed.exception';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';

const { updater } = usersConfig;
const { context } = updater.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserUpdater {
	constructor(@Inject(UserProxies.UPDATE) private readonly proxy: ClientProxy) {}

	async run(request: UpdateUserRequest): Promise<UpdateUserResponse> {
		const payload = EventPayloadFactory.create(UserDomainEvents.UPDATE, request);

		try {
			const updatedUser$ = this.proxy
				.send<UpdateUserResponse>(UserDomainEvents.UPDATE, payload)
				.pipe(timeout(10000));

			return await firstValueFrom(updatedUser$);
		} catch (error) {
			logger.error(error);
			throw new UpdateUserFailedException(context);
		}
	}
}
