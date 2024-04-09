import { ApiProperty } from '@nestjs/swagger';

import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';
import { FindUserByIdResponseInterface } from '../../../../../shared/app/modules/users/interfaces/find-user-by-id-response.interface';
import { userPropertiesSwagger } from '../../config/swagger/properties/user-properties.swagger';

const { id, name, email } = userPropertiesSwagger;

export class FindUserByIdResponse
	implements Exact<FindUserByIdResponseInterface, FindUserByIdResponse>
{
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	@ApiProperty(email)
	readonly email: string;
}
