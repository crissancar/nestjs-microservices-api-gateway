import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { EventPayloadFactory } from '../../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../../shared/app/modules/users/enums/user-proxies.enum';
import { usersConfig } from '../../config/users.config';
import { CreateUserFailedException } from '../../domain/exceptions/create-user-failed.exception';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';

const { creator } = usersConfig;
const { context } = creator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserCreator {
	constructor(@Inject(UserProxies.CREATE) private readonly proxy: ClientProxy) {}

	async run(request: CreateUserRequest): Promise<CreateUserResponse> {
		const payload = EventPayloadFactory.create(UserDomainEvents.CREATE, request);

		try {
			const createdUser$ = this.proxy
				.send<CreateUserResponse>(UserDomainEvents.CREATE, payload)
				.pipe(timeout(10000));

			return await firstValueFrom(createdUser$);
		} catch (error) {
			logger.error(error);
			throw new CreateUserFailedException(context);
		}
	}
}
