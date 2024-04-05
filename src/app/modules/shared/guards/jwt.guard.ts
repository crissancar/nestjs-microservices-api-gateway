import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CORRELATION_ID_HEADER } from '../../../../config/middlewares/correlation-id.middleware';
import { User } from '../../../../shared/webapp/api/users/models/user.model';
import { InvalidTokenException } from '../../auth/exceptions/invalid-token.exception';
import { jwtGuardConstants } from '../config/constants/jwt-guard.constants';

const { context, passportStrategy } = jwtGuardConstants;

@Injectable()
export class JwtGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		user: User,
		info: unknown,
		executionContext: ExecutionContext,
	): User {
		const request = executionContext.switchToHttp().getRequest<Request>();

		if (!user) {
			throw new InvalidTokenException(context);
		}

		const correlation = request[CORRELATION_ID_HEADER] as never;

		request.authUser = { ...user, correlation };

		return user;
	}
}
