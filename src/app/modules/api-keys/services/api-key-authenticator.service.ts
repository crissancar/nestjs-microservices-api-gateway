import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { ApiKeyProxies } from '../../../../shared/app/modules/api-keys/enums/api-key-client-proxies.enum';
import { AuthDomainEvents } from '../../../../shared/app/modules/auth/enums/auth-domain-events.enum';
import { EventPayloadFactory } from '../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { InvalidCredentialsException } from '../../auth/exceptions/invalid-credentials.exception';
import { AuthenticateApiKeyRequest } from '../dtos/authenticate-api-key.request.dto';
import { AuthenticateApiKeyResponse } from '../dtos/authenticate-api-key.response.dto';

const logger = LoggerFactory.create('ApiKeyAuthenticator');

@Injectable()
export class ApiKeyAuthenticator {
	constructor(@Inject(ApiKeyProxies.AUTH) private readonly proxy: ClientProxy) {}

	async run(request: AuthenticateApiKeyRequest): Promise<AuthenticateApiKeyResponse> {
		const payload = EventPayloadFactory.create(AuthDomainEvents.AUTH_API_KEY, request);

		try {
			const authApiKey$ = this.proxy
				.send<AuthenticateApiKeyResponse>(AuthDomainEvents.AUTH_API_KEY, payload)
				.pipe(timeout(30000));

			return await firstValueFrom(authApiKey$);
		} catch (error) {
			if (error?.error?.code === HttpStatus.UNAUTHORIZED) {
				throw new InvalidCredentialsException('ApiKeyAuthenticator');
			}
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
