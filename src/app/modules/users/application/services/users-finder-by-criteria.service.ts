import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { EventPayloadFactory } from '../../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../../shared/app/modules/users/enums/user-proxies.enum';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';

const logger = LoggerFactory.create('UsersFinderByCriteria');

@Injectable()
export class UsersFinderByCriteria {
	constructor(@Inject(UserProxies.FIND_BY_CRITERIA) private readonly proxy: ClientProxy) {}

	async run(request: FindUsersByCriteriaRequest): Promise<FindUsersByCriteriaResponse> {
		const payload = EventPayloadFactory.create(UserDomainEvents.FIND_BY_CRITERIA, request);

		try {
			const foundUsers$ = this.proxy
				.send<FindUsersByCriteriaResponse>(UserDomainEvents.FIND_BY_CRITERIA, payload)
				.pipe(timeout(10000));

			return await firstValueFrom(foundUsers$);
		} catch (error) {
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
