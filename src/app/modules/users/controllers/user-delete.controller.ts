import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { SoftDeleteUserSwagger } from '../config/swagger/decorators/soft-delete-user-swagger.decorator';
import { usersConfig } from '../config/users.config';
import { SoftDeleteUserResponse } from '../dtos/soft-delete-user-response.dto';
import { UserSoftDeleter } from '../services/user-soft-deleter.service';
import { EndpointOwnerAuthentication } from './../../shared/decorators/endpoint-owner-authentication.decorator';

const { globalRoute, deleteController } = usersConfig;
const { context, routes, params } = deleteController.constants;
const { softDelete } = deleteController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserDeleteController {
	constructor(private readonly softDeleter: UserSoftDeleter) {}

	@SoftDeleteUserSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@HttpCode(HttpStatus.OK)
	@Delete(routes.softDelete)
	async softDelete(@Param(params.id) id: never): Promise<SoftDeleteUserResponse> {
		logger.log(softDelete.requestLog);

		const correlation = '' as never;

		return this.softDeleter.run({ id, correlation });
	}
}
