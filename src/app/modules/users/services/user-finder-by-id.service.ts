import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { EventPayloadFactory } from '../../../../shared/microservices/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../shared/microservices/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../shared/microservices/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../shared/microservices/users/enums/user-proxies.enum';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { FindUserFailedException } from '../exceptions/find-user-failed.exception';

const { finderById } = usersConfig;
const { context } = finderById.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserFinderById {
	constructor(@Inject(UserProxies.FIND_BY_ID) private readonly proxy: ClientProxy) {}

	async run(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
		const payload = EventPayloadFactory.create(UserDomainEvents.FIND_BY_ID, request);

		try {
			const foundUser$ = this.proxy
				.send<FindUserByIdResponse>(UserDomainEvents.FIND_BY_ID, payload)
				.pipe(timeout(10000));

			return await firstValueFrom(foundUser$);
		} catch (error) {
			logger.error(error);
			throw new FindUserFailedException(context);
		}
	}
}
