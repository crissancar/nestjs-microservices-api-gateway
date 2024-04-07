import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { EventPayloadFactory } from '../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { FindByOptions } from '../../../../shared/app/modules/shared/types/find-by-options.type';
import { FindRawUserByOptionsRequest } from '../../../../shared/app/modules/users/dtos/find-raw-user-by-options-request.dto';
import { UserDomainEvents } from '../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../shared/app/modules/users/enums/user-proxies.enum';
import { User } from '../../../../shared/app/modules/users/models/user.model';
import { usersConfig } from '../config/users.config';
import { FindUserByIdRequest } from '../dtos/find-user-by-id-request.dto';
import { FindUserForStrategyResponse } from '../dtos/find-user-for-strategy-response.dto';
import { FindUserFailedException } from '../exceptions/find-user-failed.exception';

const { finderById } = usersConfig;
const { context } = finderById.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class UserFinderForStrategy {
	constructor(@Inject(UserProxies.FIND_RAW_BY_OPTIONS) private readonly proxy: ClientProxy) {}

	async run(request: FindUserByIdRequest): Promise<FindUserForStrategyResponse> {
		const { id, correlation } = request;
		const options = {
			key: 'id',
			value: id,
			columns: ['audiences'],
		} as FindByOptions<User>;
		const eventRequest = FindRawUserByOptionsRequest.create(options, correlation);
		const payload = EventPayloadFactory.create(UserDomainEvents.FIND_RAW_BY_OPTIONS, eventRequest);

		try {
			const foundUser$ = this.proxy
				.send<FindUserForStrategyResponse>(UserDomainEvents.FIND_RAW_BY_OPTIONS, payload)
				.pipe(timeout(10000));

			return await firstValueFrom(foundUser$);
		} catch (error) {
			logger.error(error);
			throw new FindUserFailedException(context);
		}
	}
}
