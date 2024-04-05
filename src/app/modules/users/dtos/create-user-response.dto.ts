import { ApiProperty } from '@nestjs/swagger';

import { Exact } from '../../../../shared/microservices/shared/types/exact.type';
import { CreateUserResponseInterface } from '../../../../shared/webapp/api/users/interfaces/create-user-response.interface';
import { userPropertiesSwagger } from '../config/swagger/properties/user-properties.swagger';

const { id, name, email } = userPropertiesSwagger;

export class CreateUserResponse implements Exact<CreateUserResponseInterface, CreateUserResponse> {
	@ApiProperty(id)
	readonly id: string;

	@ApiProperty(name)
	readonly name: string;

	@ApiProperty(email)
	readonly email: string;
}
