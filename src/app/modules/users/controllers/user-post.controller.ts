import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoggerFactory } from '../../../../shared/microservices/shared/services/logger-factory.service';
import { ApiKeyAudiences } from '../../api-keys/enums/api-key-audiences.enum';
import { EndpointApiKeyAuthentication } from '../../shared/decorators/endpoint-api-key-authentication.decorator';
import { UuidGenerator } from '../../shared/decorators/uuid-generator.decorator';
import { CreateUserSwagger } from '../config/swagger/decorators/create-user-swagger.decorator';
import { usersConfig } from '../config/users.config';
import { CreateUserRequest } from '../dtos/create-user-request.dto';
import { CreateUserResponse } from '../dtos/create-user-response.dto';
import { UserCreator } from '../services/user-creator.service';

const { globalRoute, postController } = usersConfig;
const { context } = postController.constants;
const { requestLog } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserPostController {
	constructor(private readonly creator: UserCreator) {}

	@CreateUserSwagger()
	@EndpointApiKeyAuthentication(ApiKeyAudiences.ADMIN, ApiKeyAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async run(
		@UuidGenerator() id: never,
		@Body() request: CreateUserRequest,
	): Promise<CreateUserResponse> {
		logger.log(requestLog);

		return this.creator.run({ ...request, id });
	}
}
