import { ApiProperty } from '@nestjs/swagger';

import { Exact } from '../../../../shared/microservices/shared/types/exact.type';
import { FindUsersByCriteriaResponseInterface } from '../../../../shared/webapp/api/users/interfaces/find-users-by-criteria-response.interface';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';
import { FindUserByIdResponse } from './find-user-by-id-response.dto';

const { usersCriteria } = userPropertiesSwagger;

export class FindUsersByCriteriaResponse
	implements Exact<FindUsersByCriteriaResponseInterface, FindUsersByCriteriaResponse>
{
	@ApiProperty(usersCriteria)
	readonly data: Array<FindUserByIdResponse>;

	readonly count: number;

	readonly currentCount: number;

	readonly take: number;

	readonly page: number;
}
