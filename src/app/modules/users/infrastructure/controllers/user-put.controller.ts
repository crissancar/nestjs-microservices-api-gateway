import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserAudiences } from '../../../shared/domain/enums/user-audiences.enum';
import { EndpointOwnerAuthentication } from '../../../shared/infrastructure/decorators/endpoint-owner-authentication.decorator';
import { UpdateUserParams } from '../../application/dtos/update-user-params.dto';
import { UpdateUserRequest } from '../../application/dtos/update-user-request.dto';
import { UpdateUserResponse } from '../../application/dtos/update-user-response.dto';
import { UserUpdater } from '../../application/services/user-updater.service';
import { UpdateUserSwagger } from '../../config/swagger/decorators/update-user-swagger.decorator';
import { usersConfig } from '../../config/users.config';

const { globalRoute, putController } = usersConfig;
const { context, routes, param } = putController.constants;
const { requestLog } = putController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserPutController {
	constructor(private readonly userUpdater: UserUpdater) {}

	@UpdateUserSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.CREATED)
	@Put(routes.updateUser)
	async update(
		@Param() params: UpdateUserParams,
		@Body() request: UpdateUserRequest,
	): Promise<UpdateUserResponse> {
		logger.log(requestLog);

		return this.userUpdater.run({ ...params, ...request });
	}
}
