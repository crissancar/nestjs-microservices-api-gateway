import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { CORRELATION_ID_HEADER } from '../../../../../config/middlewares/correlation-id.middleware';
import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { UserAudiences } from '../../../shared/domain/enums/user-audiences.enum';
import { EndpointAuthentication } from '../../../shared/infrastructure/decorators/endpoint-authentication.decorator';
import { EndpointOwnerAuthentication } from '../../../shared/infrastructure/decorators/endpoint-owner-authentication.decorator';
import { FindUserByIdParams } from '../../application/dtos/find-user-by-id-params.dto';
import { FindUserByIdResponse } from '../../application/dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaRequest } from '../../application/dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../../application/dtos/find-users-by-criteria-response.dto';
import { UserFinderById } from '../../application/services/user-finder-by-id.service';
import { UsersFinderByCriteria } from '../../application/services/users-finder-by-criteria.service';
import { FindUserByIdSwagger } from '../../config/swagger/decorators/find-user-by-id-swagger.decorator';
import { FindUsersByCriteriaSwagger } from '../../config/swagger/decorators/find-users-by-criteria-swagger.decorator';
import { usersConfig } from '../../config/users.config';

const { globalRoute, getController } = usersConfig;
const { context, routes, params } = getController.constants;
const { find, findByCriteria } = getController.logs;

const logger = LoggerFactory.create(context);

@Controller(globalRoute)
export class UserGetController {
	constructor(
		private readonly finderById: UserFinderById,
		private readonly finderByCriteria: UsersFinderByCriteria,
	) {}

	@FindUserByIdSwagger()
	@EndpointOwnerAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get(routes.find)
	async findById(
		@Param() params: FindUserByIdParams,
		@Req() request: Request,
	): Promise<FindUserByIdResponse> {
		logger.log(find.requestLog);

		const correlation = request[CORRELATION_ID_HEADER] as never;

		return await this.finderById.run({ ...params, correlation });
	}

	@FindUsersByCriteriaSwagger()
	@EndpointAuthentication(UserAudiences.ADMIN, UserAudiences.GENERAL)
	@Get()
	async findByCriteria(
		@Query() request: FindUsersByCriteriaRequest,
	): Promise<FindUsersByCriteriaResponse> {
		logger.log(findByCriteria.requestLog);

		return this.finderByCriteria.run(request);
	}
}
