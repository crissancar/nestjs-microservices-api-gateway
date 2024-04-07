import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { CORRELATION_ID_HEADER } from '../../../../config/middlewares/correlation-id.middleware';
import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { EndpointAuthentication } from '../../shared/decorators/endpoint-authentication.decorator';
import { EndpointOwnerAuthentication } from '../../shared/decorators/endpoint-owner-authentication.decorator';
import { UserAudiences } from '../../shared/enums/user-audiences.enum';
import { FindUserByIdSwagger } from '../config/swagger/decorators/find-user-by-id-swagger.decorator';
import { FindUsersByCriteriaSwagger } from '../config/swagger/decorators/find-users-by-criteria-swagger.decorator';
import { usersConfig } from '../config/users.config';
import { FindUserByIdParams } from '../dtos/find-user-by-id-params.dto';
import { FindUserByIdResponse } from '../dtos/find-user-by-id-response.dto';
import { FindUsersByCriteriaRequest } from '../dtos/find-users-by-criteria.request.dto';
import { FindUsersByCriteriaResponse } from '../dtos/find-users-by-criteria-response.dto';
import { UserFinderById } from '../services/user-finder-by-id.service';
import { UsersFinderByCriteria } from '../services/users-finder-by-criteria.service';

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
