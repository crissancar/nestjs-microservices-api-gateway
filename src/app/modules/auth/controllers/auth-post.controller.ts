import { Controller, Post } from '@nestjs/common';

import { AuthenticatedUser } from '../../../../shared/microservices/auth/dtos/authenticated-user.dto';
import { LoggerFactory } from '../../../../shared/microservices/shared/services/logger-factory.service';
import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { authConfig } from '../config/auth.config';
import { LoginSwagger } from '../config/swagger/decorators/login-swagger.decorator';
import { RefreshTokenSwagger } from '../config/swagger/decorators/refresh-swagger.decorator';
import { AuthUser } from '../decorators/auth-user.decorator';
import { LoginAuthentication } from '../decorators/login-authentication.decorator';
import { CreateUserTokensResponse } from '../dtos/create-user-tokens.response.dto';
import { JwtCreator } from '../services/jwt-creator.service';

const { globalRoute, postController } = authConfig;
const { context, routes } = postController.constants;
const { login, refresh } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class AuthPostController {
	constructor(private readonly jwtCreator: JwtCreator) {}

	@LoginSwagger()
	@LoginAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@Post(routes.login)
	async login(@AuthUser() authUser: AuthenticatedUser): Promise<CreateUserTokensResponse> {
		logger.log(login.requestLog);

		const correlation = '' as never;

		return await this.jwtCreator.run({ correlation, authUser });
	}

	@RefreshTokenSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Post(routes.refreshToken)
	async refreshToken(@AuthUser() authUser: AuthenticatedUser): Promise<CreateUserTokensResponse> {
		logger.log(refresh.requestLog);
		const correlation = '' as never;

		return await this.jwtCreator.run({ correlation, authUser });
	}
}
