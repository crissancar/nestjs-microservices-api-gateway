import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthenticatedUser } from '../../../../../shared/app/modules/auth/dtos/authenticated-user.dto';
import { authConfig } from '../../config/auth.config';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';

const { localGuard } = authConfig;
const { context } = localGuard.constants;

@Injectable()
export class LocalGuard extends AuthGuard('local') {
	// @ts-ignore
	handleRequest(
		error: unknown,
		user: AuthenticatedUser,
		info: unknown,
		executionContext: ExecutionContext,
	): boolean {
		const request = executionContext.switchToHttp().getRequest<Request>();

		if (error) {
			throw error;
		}

		if (!user) {
			throw new InvalidCredentialsException(context);
		}

		request.authUser = user;

		return true;
	}
}
