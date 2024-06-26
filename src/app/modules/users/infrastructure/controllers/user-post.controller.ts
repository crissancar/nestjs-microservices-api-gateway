import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { ApiKeyAudiences } from '../../../api-keys/domain/enums/api-key-audiences.enum';
import { EndpointApiKeyAuthentication } from '../../../shared/infrastructure/decorators/endpoint-api-key-authentication.decorator';
import { UuidGenerator } from '../../../shared/infrastructure/decorators/uuid-generator.decorator';
import { CreateUserRequest } from '../../application/dtos/create-user-request.dto';
import { CreateUserResponse } from '../../application/dtos/create-user-response.dto';
import { UserCreator } from '../../application/services/user-creator.service';
import { CreateUserSwagger } from '../../config/swagger/decorators/create-user-swagger.decorator';
import { usersConfig } from '../../config/users.config';

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
