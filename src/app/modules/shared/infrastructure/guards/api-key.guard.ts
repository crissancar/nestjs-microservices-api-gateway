import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { InvalidApiKeyException } from '../../../api-keys/domain/exceptions/invalid-api-key.exception';
import { ApiKey } from '../../../api-keys/domain/models/api-key.model';
import { apiKeyGuardConstants } from '../../config/constants/api-key-guard.constants';

const { context, passportStrategy } = apiKeyGuardConstants;

@Injectable()
export class ApiKeyGuard extends AuthGuard(passportStrategy) {
	// @ts-ignore
	handleRequest(
		error: unknown,
		apiKey: ApiKey,
		info: unknown,
		executionContext: ExecutionContext,
	): ApiKey {
		const request = executionContext.switchToHttp().getRequest<Request>();

		if (!apiKey) {
			throw new InvalidApiKeyException(context);
		}

		request.apiKey = apiKey;

		return apiKey;
	}
}
