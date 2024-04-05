import { ApiProperty } from '@nestjs/swagger';

import { Exact } from '../../../../shared/microservices/shared/types/exact.type';
import { UpdateUserResponseInterface } from '../../../../shared/webapp/api/users/interfaces/update-user-response.interface';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { id, name, email } = userPropertiesSwagger;

export class UpdateUserResponse implements Exact<UpdateUserResponseInterface, UpdateUserResponse> {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	@ApiProperty(email)
	readonly email: string;
}
