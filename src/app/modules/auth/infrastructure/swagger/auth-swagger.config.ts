import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CreateUserTokensResponse } from '../../application/dtos/create-user-tokens.response.dto';
import { LoginUserRequest } from '../../application/dtos/login-user-request.dto';
import { RefreshTokenResponse } from '../../application/dtos/refresh-token-response.dto';

const { ok, unauthorized, badRequest } = sharedResponsesSwagger;

export const authSwaggerConfig = {
	tag: 'Auth',
	login: {
		operation: {
			summary: 'Login user',
		},
		body: { type: LoginUserRequest },
		response: {
			ok: {
				...ok,
				type: CreateUserTokensResponse,
			},
			unauthorized,
		},
	},
	refreshToken: {
		operation: {
			summary: 'Refresh user token',
		},
		response: {
			ok: {
				...ok,
				type: RefreshTokenResponse,
			},
			badRequest,
		},
	},
};
