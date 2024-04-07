import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { AuthDomainEvents } from '../../../../shared/app/modules/auth/enums/auth-domain-events.enum';
import { AuthProxies } from '../../../../shared/app/modules/auth/enums/auth-proxies.enum';
import { EventPayloadFactory } from '../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { CreateUserTokensResponse } from '../dtos/create-user-tokens.response.dto';
import { CreateUserTokensRequest } from '../dtos/create-user-tokens-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const logger = LoggerFactory.create('JwtCreator');

@Injectable()
export class JwtCreator {
	constructor(@Inject(AuthProxies.CREATE_TOKENS) private readonly authProxy: ClientProxy) {}

	async run(request: CreateUserTokensRequest): Promise<CreateUserTokensResponse> {
		const message = EventPayloadFactory.create(AuthDomainEvents.CREATE_TOKENS, request);

		try {
			const createdTokens$ = this.authProxy
				.send<CreateUserTokensResponse>(AuthDomainEvents.CREATE_TOKENS, message)
				.pipe(timeout(30000));

			return await firstValueFrom(createdTokens$);
		} catch (error) {
			if (error.error.code === HttpStatus.UNAUTHORIZED) {
				throw new InvalidCredentialsException('JwtCreator');
			}
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
