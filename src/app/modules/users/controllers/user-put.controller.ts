import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { UpdateUserSwagger } from '../config/swagger/decorators/update-user-swagger.decorator';
import { usersConfig } from '../config/users.config';
import { UpdateUserParams } from '../dtos/update-user-params.dto';
import { UpdateUserRequest } from '../dtos/update-user-request.dto';
import { UpdateUserResponse } from '../dtos/update-user-response.dto';
import { UserUpdater } from '../services/user-updater.service';

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
