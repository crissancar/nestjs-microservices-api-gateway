import { sharedResponsesSwagger } from '../../../shared/config/swagger/shared-responses.swagger';
import { CreateUserTokensResponse } from '../../dtos/create-user-tokens.response.dto';
import { LoginUserRequest } from '../../dtos/login-user-request.dto';
import { RefreshTokenResponse } from '../../dtos/refresh-token-response.dto';

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
