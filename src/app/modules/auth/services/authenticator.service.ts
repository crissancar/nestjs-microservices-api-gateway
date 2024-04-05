import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { AuthenticatedUser } from '../../../../shared/microservices/auth/dtos/authenticated-user.dto';
import { AuthDomainEvents } from '../../../../shared/microservices/auth/enums/auth-domain-events.enum';
import { AuthProxies } from '../../../../shared/microservices/auth/enums/auth-proxies.enum';
import { EventPayloadFactory } from '../../../../shared/microservices/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../shared/microservices/shared/services/logger-factory.service';
import { authConfig } from '../config/auth.config';
import { LoginUserRequest } from '../dtos/login-user-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

const { authenticator } = authConfig;
const { context } = authenticator.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class Authenticator {
	constructor(@Inject(AuthProxies.AUTH_USER) private readonly proxy: ClientProxy) {}

	async run(request: LoginUserRequest): Promise<AuthenticatedUser> {
		const payload = EventPayloadFactory.create(AuthDomainEvents.AUTH_USER, request);

		try {
			const authUser$ = this.proxy
				.send<AuthenticatedUser>(AuthDomainEvents.AUTH_USER, payload)
				.pipe(timeout(30000));

			return await firstValueFrom(authUser$);
		} catch (error) {
			if (error?.error?.code === HttpStatus.UNAUTHORIZED) {
				throw new InvalidCredentialsException('LocalStrategy');
			}
			logger.error(error);
			throw new BadRequestException();
		}
	}
}
